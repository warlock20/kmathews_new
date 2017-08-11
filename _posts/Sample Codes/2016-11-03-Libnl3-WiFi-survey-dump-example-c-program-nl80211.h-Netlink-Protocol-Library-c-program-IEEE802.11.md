---
layout: post
title: Program to collect survey details of  WiFi interface using Netlink Protocol Library
meta: Program to WiFi interface survey details using libnl3 Library
categories: wireless
tags: wireless IEEE802.11 Netlink nl80211.h
excerpt: "A sample program to get survey details of a WiFi interface using Netlink Library nl80211.h "
modified: 2016-11-03
author: Kiran Mathews
comments: true
share: true
---


<p>In this tutorial, we write a sample <i>c</i> program to collect the survey details of a WiFi interface. i.e the output of <code style="border: 1px solid #ffffff">  iw dev 'inferfaceName' survey dump</code> </p>
<p> Depending on the hardware, survey details includes <i>channel active time, channel busy time, transmission time, reception time, noise</i> and other details. To get the information from the hardware registry, we use Netlink libraries (libnl3). Make sure you have necessary libnl3 headers in your system. The package name is <code style="border: 1px solid #ffffff">libnl3-devel(Fedora), libnl3-dev(Debian), <a href="https://www.rpmfind.net/linux/rpm2html/search.php?query=libnl3-devel"> rpm link.</a></code> The output depends on your hardware and kernel verison. I refered the source code of <a href="https://www.kernel.org/pub/software/network/iw/"> iw</a> and <a href="http://www.infradead.org/~tgr/libnl/doc/core.html">Netlink protocol library suite dcoumentation </a> for writing the program. Also, debug the iw commands using <code> NLDBG=4 or NLCB=debug</code> to understand message values passed to the socket.</p>

<p> Here, I am listing some of the links of sample programs using libnl3 libraries, which seems to be useful for understanding the working of Netlink protocol suite.
	<ul style="list-style-type:square">
		<li> <a href="https://github.com/Robpol86/libnl
			">https://github.com/Robpol86/libnl
		</a></li>
		<li> <a href="http://linux-hacks.blogspot.de/2009/01/sample-code-to-learn-netlink.html">http://linux-hacks.blogspot.de/2009/01/sample-code-to-learn-netlink.html</a></li>
		<li> <a href="http://stackoverflow.com/questions/18062268/using-nl80211-h-to-scan-access-points">http://stackoverflow.com/questions/18062268/using-nl80211-h-to-scan-access-points</a></li>
	</ul>
</p>
For compling the program, link with necessary libraries, i.e.<code style="border: 1px solid #ffffff"> gcc main_survey.c -I /usr/include/libnl3  -lnl-3 -lnl-cli-3 -lnl-genl-3</code>. In this example, I assumed the interface name as <i>mon0</i>.

	/*
	* main_survey.c
	*
	*  Created on: Nov 3, 2016
	*      Author: k_mathews
	*/


	#include <netlink/netlink.h>
	#include <netlink/socket.h>
	#include <netlink/genl/genl.h>
	#include <netlink/genl/ctrl.h>
	#include <netlink/genl/family.h>
	#include <net/if.h>
	#include <linux/nl80211.h>

	static int expectedId;

	static int error_handler(struct sockaddr_nl *nla, struct nlmsgerr *err,
	void *arg)
	{
		printf("Error in callback\n");
		return 1;

	}

	static int nlCallback(struct nl_msg* msg, void* arg)
	{
		printf("Callback Received\n");
		struct nlattr *tb[NL80211_ATTR_MAX + 1];
		struct genlmsghdr *gnlh = nlmsg_data(nlmsg_hdr(msg));
		struct nlattr *sinfo[NL80211_SURVEY_INFO_MAX + 1];
		char dev[20];

		static struct nla_policy survey_policy[NL80211_SURVEY_INFO_MAX + 1] = {
			[NL80211_SURVEY_INFO_FREQUENCY] = { .type = NLA_U32 },
			[NL80211_SURVEY_INFO_NOISE] = { .type = NLA_U8 },
		};

		nla_parse(tb, NL80211_ATTR_MAX, genlmsg_attrdata(gnlh, 0),
		genlmsg_attrlen(gnlh, 0), NULL);

		if_indextoname(nla_get_u32(tb[NL80211_ATTR_IFINDEX]), dev);
		printf("Survey data from %s\n", dev);

		if (!tb[NL80211_ATTR_SURVEY_INFO]) {
			fprintf(stderr, "survey data missing!\n");
			return NL_SKIP;
		}

		if (nla_parse_nested(sinfo, NL80211_SURVEY_INFO_MAX,
			tb[NL80211_ATTR_SURVEY_INFO],
			survey_policy)) {
				fprintf(stderr, "failed to parse nested attributes!\n");
				return NL_SKIP;
			}
		if (sinfo[NL80211_SURVEY_INFO_FREQUENCY])
		printf("\tfrequency:\t\t\t%u MHz%s\n",
		nla_get_u32(sinfo[NL80211_SURVEY_INFO_FREQUENCY]),
		sinfo[NL80211_SURVEY_INFO_IN_USE] ? " [in use]" : "");
		if (sinfo[NL80211_SURVEY_INFO_NOISE])
		printf("\tnoise:\t\t\t\t%d dBm\n",
		(int8_t)nla_get_u8(sinfo[NL80211_SURVEY_INFO_NOISE]));
		if (sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME])
		printf("\tchannel active time:\t\t%llu ms\n",
		(unsigned long long)nla_get_u64(sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME]));
		if (sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME_BUSY])
		printf("\tchannel busy time:\t\t%llu ms\n",
		(unsigned long long)nla_get_u64(sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME_BUSY]));
		if (sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME_EXT_BUSY])
		printf("\textension channel busy time:\t%llu ms\n",
		(unsigned long long)nla_get_u64(sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME_EXT_BUSY]));
		if (sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME_RX])
		printf("\tchannel receive time:\t\t%llu ms\n",
		(unsigned long long)nla_get_u64(sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME_RX]));
		if (sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME_TX])
		printf("\tchannel transmit time:\t\t%llu ms\n",
		(unsigned long long)nla_get_u64(sinfo[NL80211_SURVEY_INFO_CHANNEL_TIME_TX]));
		return NL_SKIP;
	}



	int main(int argc, char** argv){
		int ret;

		//allocate socket
		struct nl_sock* sk = nl_socket_alloc();
		if (!sk) {
			printf("Failed to allocate netlink socket.\n");

		}
		/*
		* connect to generic netlink
		* genl_connect(sk); wiil bind the socket
		*
		*/
		if (genl_connect(sk)) {
			printf("Failed to connect to generic netlink.\n");
			goto out_handle_destroy;
		}


		//find the nl80211 driver ID
		expectedId = genl_ctrl_resolve(sk, "nl80211");

		// callback identifier
		struct nl_cb *cb = nl_cb_alloc(NL_CB_DEFAULT);

		//allocate a message
		struct nl_msg* msg = nlmsg_alloc();



		const enum nl80211_commands cmd = NL80211_CMD_GET_SURVEY;


		/*
		* Change the interface name here
		* */
		int ifIndex = if_nametoindex("mon0");

		/** setup the message
		* NLM_F_DUMP: Flag to dump the survey details
		***/
		genlmsg_put(msg, 0, 0, expectedId, 0, NLM_F_DUMP, cmd, 0);

		//add message attributes
		nla_put_u32(msg, NL80211_ATTR_IFINDEX, ifIndex);


		//
		/*attach a callback
		*				(another way to attach callback)
		* nl_socket_modify_cb(sk, NL_CB_VALID, NL_CB_CUSTOM,
		  nlCallback2, NULL);
		*/
		nl_socket_set_cb(sk,cb);
		nl_cb_set(cb, NL_CB_VALID, NL_CB_CUSTOM, nlCallback, NULL);
		nl_cb_err(cb, NL_CB_CUSTOM, error_handler, NULL);



		//send the messge (this frees it)
		ret = nl_send_auto_complete(sk, msg);
		//block for message to return
		nl_recvmsgs_default(sk);
		return 0;

		nla_put_failure:
		 nlmsg_free(msg);
		return 1;
		out_handle_destroy:
		 nl_socket_free(sk);
	}

<p>Feel free to ask any questions regarding using libnl3 :-)</p>
