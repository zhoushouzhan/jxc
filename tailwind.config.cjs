/*
 * @Author: 一品网络技术有限公司
 * @Date: 2022-06-21 22:45:34
 * @LastEditTime: 2024-01-01 18:43:26
 * @FilePath: \ypcmsvue3\tailwind.config.cjs
 * @Description:
 * 联系QQ:58055648
 * Copyright (c) 2022 by 东海县一品网络技术有限公司, All Rights Reserved.
 */
module.exports = {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx,css}"],
	theme: {
		extend:{
			colors:{
				'hui':{
					50:'#F7F7F7',
					100:'#c6cacf',
					200:'#808695',
					300:'#2C3741',
					900:'#191A23'
				},
				'hong':{
					50:'#FFF1F0',
					200:'#F16C4B',
					300:'#ED4014'
				},
				'chen':{
					50:'#FFF7E6',
					200:'#EDBC73',
					300:'#E6A23C'
				},
				'lan':{
					50:'#E6F7FF',
					200:'#49ABF0',
					300:'#2D8CF0'
				},
				'lv':{
					50:'#F6FFED',
					200:'#57D67D',
					300:'#2FC25B'
				},
				'qin':{
					200:'#00BDAD',
					300:'#00a497'
				},
				'zi':{
					200:'#BF1884',
					300:'#A81574'
				}
			},
			fontFamily:{
				yahei:['Microsoft Yahei']
			}
		}
	},
	plugins: [],
	variants: {
		extend: {
			backgroundColor: ["group-focus"],
			display: ["group-focus"],
		},
	},
};
