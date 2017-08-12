---
layout: post
title: Packet Sniffer for IEEE 802.11
meta: Packet Sniffer for IEEE 802.11 with CRC check
categories: wireless
tags: wireless IEEE802.11
excerpt: "Packet sniffer for IEEE 802.11 (WLAN) with CRC check"
date: 2016-08-14
modified: 2016-08-20
comments: true
share: true
---


<p>In this tutorial, we write a sample <i>c</i> program to sniff the WLAN frames (including corrupted frames). First of all, the interface must be switched into the monitor mode by setting FCS flag.</p>

	iw dev <interfaceName> interface add mon0 type monitor flags fcsfail

<p>The above command will create a monitor interface with name <i>mon0</i>. Since we passed FCS fail flag, the driver will not drop the corrupted frames too. We use the Pcap library for capturing the frames. Now let us go through the code.</p>

<p>I wrote this program with the target to check the link quality, i.e. what percentage of frame get corrupted. Replace <code style="border: 1px solid #ffffff"> char *filter= "wlan src 13:22:33:44:55:66" </code> in the code with sender address of your device. The program was tested for <b>ATH9k</b> driver in linux kernel version <b>4.6.4</b>.</p>
<p>
	In this program, I calculate the percentage of corrupted frames. If there is a high percentage of corrupted frames, it is due to poor link quality. Following is the complete code:
</p>

	/*
	* Packet_Capture_with_CRC_Check.cc
	*
	*  Created on: 25.09.2016
	*      Author: k.mathews
	*/
	#include <pcap.h>
	#include <stdio.h>
	#include <stdlib.h>
	#include <errno.h>
	#include <sys/socket.h>
	#include <netinet/in.h>
	#include <arpa/inet.h>
	#include <netinet/if_ether.h>
	#include <string.h>
	#include <time.h>
	#include <stdint.h>
	#include <inttypes.h>

	struct ieee80211_radiotap_header {
	        u_int8_t        it_version;     /* set to 0 */
	        u_int8_t        it_pad;
	        u_int16_t       it_len;         /* entire length */
	        u_int32_t       it_present;     /* fields present */
	} __attribute__((__packed__));


	struct ieee80211_hdr {
	  uint16_t frame_control;
	  uint16_t  duration_id;
	  uint8_t addr1[6];
	  uint8_t addr2[6];
	  uint8_t addr3[6];
	  uint16_t  seq_ctrl;
	  uint8_t addr4[6];
	} __attribute__ ((packed));

	int totalRXFrame,corruptedFrames;

	/*
	Callback function.
	*/

	void my_callback_general(u_char *useless,const struct pcap_pkthdr* pkthdr,const u_char*
	packet){
		printf("\n********************************** CRC CHECKING ************************************\n");
		int i,j,len;
		const struct ieee80211_radiotap_header *rt;
		const struct ieee80211_hdr  *ethernet;
		unsigned int rxCRC;

		/* Variables for CRC calculation */

		unsigned int byte, crcCalculated, c;
		const unsigned int g0 = 0xEDB88320, g1 = g0 >> 1,
		                      g2 = g0 >> 2,    g3 = g0 >> 3;

		rt = (struct ieee80211_radiotap_header*)(packet);
		ethernet = (struct ieee80211_hdr*)(packet+rt->it_len);

		printf("Payload:\n"); /* And now the data */
		printf("Packet Lenght:%i \t length of portion %i size of radiotap header %i\n",
				(pkthdr->len),(pkthdr->caplen),rt->it_len);

		len = (pkthdr->len) - rt->it_len - 4 ;
		uint8_t *data[(len-1)];

		/* Trimming data for calculating CRC (exculding RadiotapHeader and last 4 byte(CRC))*/
		for(i=rt->it_len,j=0;i<(pkthdr->len)-4;i++,j++) {
				data[j]=packet[i];
			}
	 	printf("Trimmed data :\n");
		for(i=0;i<len;i++) {
			 printf("%x",data[i]);
		}
		printf("\n");

		/* Received CRC in rxCRC*/
		rxCRC = 0x00000000;
		rxCRC=(packet[(pkthdr->len)-4]<<24)|
			 (packet[(pkthdr->len)-3]<<16)|
			 (packet[(pkthdr->len)-2]<<8)|
			 (packet[(pkthdr->len)-1]<<0);

		printf("\n");

		/*Calculating CRC*/
			crcCalculated = 0xFFFFFFFF;
		   for(i=0;i<len;i++){   // Get next byte.
			  byte= data[i];
			  crcCalculated = crcCalculated ^ byte;
		      for (j = 1; j >= 0; j--) {        // Do two times.
		         switch(crcCalculated & 0xF) {
		         case  0: c = 0;                  break;
		         case  1: c =                g3;  break;
		         case  2: c =           g2;       break;
		         case  3: c =           g2 ^ g3;  break;
		         case  4: c =      g1;            break;
		         case  5: c =      g1 ^      g3;  break;
		         case  6: c =      g1 ^ g2;       break;
		         case  7: c =      g1 ^ g2 ^ g3;  break;
		         case  8: c = g0;                 break;
		         case  9: c = g0 ^           g3;  break;
		         case 10: c = g0 ^      g2;       break;
		         case 11: c = g0 ^      g2 ^ g3;  break;
		         case 12: c = g0 ^ g1;            break;
		         case 13: c = g0 ^ g1 ^      g3;  break;
		         case 14: c = g0 ^ g1 ^ g2;       break;
		         case 15: c = g0 ^ g1 ^ g2 ^ g3;  break;
		         }
		         crcCalculated = (crcCalculated >> 4) ^ c;

		      }

		   }
		   crcCalculated=~crcCalculated;
		 /* Byte reverse. */
		   crcCalculated = ((unsigned char)(crcCalculated>>0)<<24) |
		    ((unsigned char)(crcCalculated>>8)<<16) |
		    ((unsigned char)(crcCalculated>>16)<<8) |
		    ((unsigned char)(crcCalculated>>24)<<0);
			printf("calculate CRC:%x\n",crcCalculated);
			printf("recevied CRC:%x\n",rxCRC);
			printf("\n");

			/* Verfiying the checksum*/
			if((int)crcCalculated != (int)rxCRC){
				printf("Corrupt Frame\n");
				totalRXFrame++;
				corruptedFrames++;
			}
			else if ((int)crcCalculated == (int)rxCRC){
				printf("Uncorrupted Frame\n");
				totalRXFrame++;
			}
		printf("\n Percentage of corrupted frame:%f",(totalRXFrame/corruptedFrames)*100);
	}

	int main(int argc, char *argv[])
	{
		char *dev ;
		char errbuf[PCAP_ERRBUF_SIZE] ;
		const u_char *packet ;
		struct pcap_pkthdr hdr;
		bpf_u_int32 netp; /* ip */
		struct ether_header *eptr; /* net/ethernet.h */
		struct bpf_program fp; /* hold compiled program */
		char *filter= "wlan src 13:22:33:44:55:66" ;
		dev = argv[1];
		totalRXFrame = 0;
		corruptedFrames = 0;
		if (dev == NULL){
		fprintf(stderr,"couldn't find default device :%s\n", errbuf);
		exit(1);
		return(2);
		}
		else
			printf("Device : %s\n",dev);
	/* sniffing */
		pcap_t *handle_capture;

		handle_capture = pcap_open_live(dev,2048,1,1000,errbuf);
		if(handle_capture == NULL){
			printf("pcap_open_live(): %s\n",errbuf);
			exit(1);
		}

	// filtering

	/* Now we'll compile the filter expression*/

		if(pcap_compile(handle_capture, &fp, filter, 0, netp) == -1) {
			fprintf(stderr, "Error calling pcap_compile\n");
			exit(1);
		}

	/* set the filter */
		if(pcap_setfilter(handle_capture, &fp) == -1) {
			fprintf(stderr, "Error setting filter\n");
			exit(1);
		}
		pcap_loop(handle_capture,atoi(argv[1]),my_callback_general,NULL);
		return(0);
	}


<p>Feel free to ask your questions :-)</p>
