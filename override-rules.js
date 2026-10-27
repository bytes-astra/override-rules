/**
 * 由 override-rules 的 convert.js 静态提取生成（Sub-Store / Mihomo 覆写脚本）。
 * 提取参数：regex=true, grouptype=1, ipv6=false, full=false,
 *          keepalive=false, fakeip=true, quic=false, tun=false, threshold=2
 * 地区组覆盖 src/catalog/countries.ts 声明的全部 22 个地区。
 * 节点筛选由内核按 countriesMeta 的正则在运行时完成，不依赖具体节点名。
 * 生成命令：npm run extract
 */
const main = (config) => {
  config["proxy-groups"] = [
    {
      name: "选择代理",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Proxy.png",
      type: "select",
      proxies: [
        "自动选择", "故障转移", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "自动选择",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Auto.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      proxies: [
        "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点"
      ],
      interval: 60,
      tolerance: 20
    },
    {
      name: "手动选择",
      icon: "https://cdn.jsdelivr.net/gh/shindgewongxj/WHATSINStash@master/icon/select.png",
      type: "select",
      "include-all": true
    },
    {
      name: "故障转移",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Available_1.png",
      type: "fallback",
      url: "https://cp.cloudflare.com",
      proxies: [
        "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点"
      ],
      interval: 60,
      tolerance: 20
    },
    {
      name: "静态资源",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Cloudflare.png",
      type: "select",
      proxies: [
        "低倍率节点", "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "AI服务",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/ChatGPT.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "加密货币",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Cryptocurrency_1.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "金融服务",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Nasdaq.png",
      type: "select",
      proxies: [
        "DIRECT", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "选择代理", "手动选择"
      ]
    },
    {
      name: "苹果服务",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Apple_2.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "谷歌服务",
      icon: "https://cdn.jsdelivr.net/gh/Orz-3/mini@master/Color/Google.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "微软服务",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Microsoft_Copilot.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "Xbox",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Xbox.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "Github",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/GitHub.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "哔哩哔哩",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/bilibili.png",
      type: "select",
      proxies: [
        "DIRECT", "台湾节点", "香港节点"
      ]
    },
    {
      name: "巴哈姆特",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Bahamut.png",
      type: "select",
      proxies: [
        "台湾节点", "选择代理", "手动选择", "DIRECT"
      ]
    },
    {
      name: "Youtube",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/YouTube.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "Twitch",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitch.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "Netflix",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Netflix.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "TikTok",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/TikTok.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "Spotify",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Spotify.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "Telegram",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Telegram.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "Twitter",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Twitter.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "新浪微博",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Weibo.png",
      type: "select",
      "include-all": true,
      proxies: [
        "DIRECT", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "选择代理", "手动选择"
      ]
    },
    {
      name: "Truth Social",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Truth_Social.png",
      type: "select",
      proxies: [
        "美国节点", "选择代理", "手动选择"
      ]
    },
    {
      name: "E-Hentai",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Ehentai.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "PikPak网盘",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/PikPak.png",
      type: "select",
      proxies: [
        "选择代理", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点", "低倍率节点", "手动选择", "DIRECT"
      ]
    },
    {
      name: "搜狗输入法",
      icon: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/icons/Sougou.png",
      type: "select",
      proxies: [
        "DIRECT", "REJECT"
      ]
    },
    {
      name: "广告拦截",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/AdBlack.png",
      type: "select",
      proxies: [
        "REJECT", "REJECT-DROP", "DIRECT"
      ]
    },
    {
      name: "Final",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Final.png",
      type: "select",
      proxies: [
        "选择代理", "DIRECT"
      ]
    },
    {
      name: "低倍率节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Lab.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "(?i)0\\.[0-5]|低倍率|省流|实验性|(?:^|[^\\d.])1x"
    },
    {
      name: "香港节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Hong_Kong.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "香港|港|\\b(?:HK|hk)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Hong Kong|HongKong|hongkong|HONG KONG|HONGKONG|深港|HKG|九龙|Kowloon|新界|沙田|荃湾|葵涌|🇭🇰"
    },
    {
      name: "台湾节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Taiwan.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "台|新北|彰化|\\b(?:TW|tw)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Taiwan|TAIWAN|TWN|TPE|ROC|🇹🇼|🇼🇸"
    },
    {
      name: "新加坡节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Singapore.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "新加坡|坡|狮城|\\b(?:SG|sg)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Singapore|SINGAPORE|SIN|🇸🇬"
    },
    {
      name: "日本节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Japan.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "日本|川日|东京|大阪|泉日|埼玉|沪日|深日|\\b(?:JP|jp)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Japan|JAPAN|JPN|NRT|HND|KIX|TYO|OSA|关西|Kansai|KANSAI|🇯🇵"
    },
    {
      name: "韩国节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Korea.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "韩国|韩|韓|春川|Chuncheon|首尔|\\b(?:KR|kr)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Korea|KOREA|KOR|ICN|🇰🇷"
    },
    {
      name: "美国节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_States.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "美国|美|波特兰|达拉斯|俄勒冈|凤凰城|费利蒙|硅谷|拉斯维加斯|洛杉矶|圣何塞|圣克拉拉|西雅图|芝加哥|纽约|亚特兰大|迈阿密|华盛顿|\\b(?:US|us)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|United States|UnitedStates|UNITED STATES|USA|America|AMERICA|JFK|EWR|IAD|ATL|ORD|MIA|NYC|LAX|SFO|SEA|DFW|SJC|🇺🇸",
      "exclude-filter": "美属|亚美尼亚|圣多美|普林西比"
    },
    {
      name: "加拿大节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Canada.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "加拿大|渥太华|温哥华|卡尔加里|蒙特利尔|Montreal|\\b(?:CA|ca)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Canada|CANADA|CAN|YVR|YYZ|YUL|🇨🇦"
    },
    {
      name: "英国节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/United_Kingdom.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "英国|伦敦|曼彻斯特|Manchester|\\b(?:UK|uk)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Britain|United Kingdom|UNITED KINGDOM|England|GBR|LHR|MAN|🇬🇧"
    },
    {
      name: "德国节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Germany.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "德国|德|柏林|法兰克福|慕尼黑|Munich|\\b(?:DE|de)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Germany|GERMANY|DEU|MUC|🇩🇪",
      "exclude-filter": "瓜德罗普"
    },
    {
      name: "法国节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/France.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "法国|法|巴黎|马赛|Marseille|\\b(?:FR|fr)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|France|FRANCE|FRA|CDG|MRS|🇫🇷",
      "exclude-filter": "法属|布基纳法索|法罗"
    },
    {
      name: "澳门节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Macao.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "澳门|\\b(?:MO|mo)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Macau|🇲🇴"
    },
    {
      name: "澳大利亚节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Australia.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "澳洲|澳大利亚|\\b(?:AU|au)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Australia|🇦🇺"
    },
    {
      name: "俄罗斯节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Russia.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "俄罗斯|俄|\\b(?:RU|ru)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Russia|🇷🇺",
      "exclude-filter": "埃塞俄比亚|白俄罗斯"
    },
    {
      name: "泰国节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Thailand.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "泰国|泰|\\b(?:TH|th)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Thailand|🇹🇭",
      "exclude-filter": "巴泰"
    },
    {
      name: "印度节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/India.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "印度|\\b(?:IN|in)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|India|🇮🇳",
      "exclude-filter": "印度洋"
    },
    {
      name: "马来西亚节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Malaysia.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "马来西亚|马来|\\b(?:MY|my)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Malaysia|🇲🇾"
    },
    {
      name: "阿根廷节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Argentina.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "阿根廷|布宜诺斯艾利斯|\\b(?:AR|ar)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Argentina|EZE|🇦🇷"
    },
    {
      name: "芬兰节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Finland.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "芬兰|赫尔辛基|\\b(?:FI|fi)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Finland|HEL|🇫🇮"
    },
    {
      name: "埃及节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Egypt.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "埃及|开罗|\\b(?:EG|eg)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Egypt|CAI|🇪🇬"
    },
    {
      name: "菲律宾节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Philippines.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "菲律宾|马尼拉|\\b(?:PH|ph)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Philippines|MNL|🇵🇭"
    },
    {
      name: "土耳其节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Turkey.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "土耳其|伊斯坦布尔|\\b(?:TR|tr)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Turkey|Türkiye|IST|🇹🇷"
    },
    {
      name: "乌克兰节点",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Ukraine.png",
      type: "url-test",
      url: "https://cp.cloudflare.com",
      interval: 60,
      tolerance: 20,
      "include-all": true,
      filter: "乌克兰|基辅|\\b(?:UA|ua)(?:[-_ ]?\\d+(?:[-_ ]?[A-Za-z]{2,})?)?\\b|Ukraine|KBP|🇺🇦"
    },
    {
      name: "GLOBAL",
      icon: "https://cdn.jsdelivr.net/gh/Koolson/Qure@master/IconSet/Color/Global.png",
      "include-all": true,
      type: "select",
      proxies: [
        "选择代理", "手动选择", "静态资源", "AI服务", "加密货币", "金融服务", "苹果服务", "谷歌服务", "微软服务", "Xbox", "Github", "哔哩哔哩", "巴哈姆特", "Youtube", "Twitch", "Netflix", "TikTok", "Spotify", "Telegram", "Twitter", "新浪微博", "Truth Social", "E-Hentai", "PikPak网盘", "搜狗输入法", "广告拦截", "Final", "自动选择", "故障转移", "低倍率节点", "香港节点", "台湾节点", "新加坡节点", "日本节点", "韩国节点", "美国节点", "加拿大节点", "英国节点", "德国节点", "法国节点", "澳门节点", "澳大利亚节点", "俄罗斯节点", "泰国节点", "印度节点", "马来西亚节点", "阿根廷节点", "芬兰节点", "埃及节点", "菲律宾节点", "土耳其节点", "乌克兰节点"
      ]
    }
  ];
  config["rule-providers"] = {
    ADBlock: {
      url: "https://cdn.jsdelivr.net/gh/217heidai/adblockfilters@main/rules/adblockmihomolite.yaml",
      path: "./ruleset/ADBlock.yaml",
      behavior: "domain",
      interval: 86400,
      format: "yaml",
      type: "http"
    },
    SogouInput: {
      url: "https://ruleset.skk.moe/Clash/non_ip/sogouinput.txt",
      path: "./ruleset/SogouInput.txt",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    StaticResources: {
      url: "https://ruleset.skk.moe/Clash/domainset/cdn.txt",
      path: "./ruleset/StaticResources.txt",
      behavior: "domain",
      interval: 86400,
      format: "text",
      type: "http"
    },
    CDNResources: {
      url: "https://ruleset.skk.moe/Clash/non_ip/cdn.txt",
      path: "./ruleset/CDNResources.txt",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    TikTok: {
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/TikTok.list",
      path: "./ruleset/TikTok.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    EHentai: {
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/EHentai.list",
      path: "./ruleset/EHentai.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    SteamFix: {
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/SteamFix.list",
      path: "./ruleset/SteamFix.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    GoogleFCM: {
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/FirebaseCloudMessaging.list",
      path: "./ruleset/FirebaseCloudMessaging.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    AdditionalFilter: {
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/AdditionalFilter.list",
      path: "./ruleset/AdditionalFilter.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    AdditionalCDNResources: {
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/AdditionalCDNResources.list",
      path: "./ruleset/AdditionalCDNResources.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    Weibo: {
      url: "https://cdn.jsdelivr.net/gh/powerfullz/override-rules@master/ruleset/Weibo.list",
      path: "./ruleset/Weibo.list",
      behavior: "classical",
      interval: 86400,
      format: "text",
      type: "http"
    },
    GFWList: {
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      path: "./ruleset/GFWList.yaml",
      behavior: "domain",
      interval: 86400,
      format: "yaml",
      type: "http"
    }
  };
  config["rules"] = [
    "AND,((DST-PORT,443),(NETWORK,UDP)),REJECT",
    "GEOIP,private,DIRECT,no-resolve",
    "RULE-SET,ADBlock,广告拦截",
    "RULE-SET,AdditionalFilter,广告拦截",
    "RULE-SET,SogouInput,搜狗输入法",
    "DOMAIN-SUFFIX,truthsocial.com,Truth Social",
    "RULE-SET,StaticResources,静态资源",
    "RULE-SET,CDNResources,静态资源",
    "RULE-SET,AdditionalCDNResources,静态资源",
    "GEOSITE,category-cryptocurrency,加密货币",
    "GEOSITE,category-finance,金融服务",
    "GEOSITE,category-ai-!cn,AI服务",
    "GEOSITE,bilibili,哔哩哔哩",
    "GEOSITE,youtube,Youtube",
    "GEOSITE,telegram,Telegram",
    "GEOIP,telegram,Telegram,no-resolve",
    "GEOSITE,xbox,Xbox",
    "GEOSITE,github,Github",
    "GEOSITE,netflix,Netflix",
    "GEOSITE,twitch,Twitch",
    "GEOIP,netflix,Netflix,no-resolve",
    "GEOSITE,spotify,Spotify",
    "GEOSITE,bahamut,巴哈姆特",
    "GEOSITE,pikpak,PikPak网盘",
    "GEOSITE,twitter,Twitter",
    "RULE-SET,Weibo,新浪微博",
    "RULE-SET,EHentai,E-Hentai",
    "RULE-SET,TikTok,TikTok",
    "RULE-SET,SteamFix,DIRECT",
    "RULE-SET,GoogleFCM,DIRECT",
    "GEOSITE,google-play@cn,DIRECT",
    "GEOSITE,microsoft@cn,DIRECT",
    "GEOSITE,apple,苹果服务",
    "GEOSITE,microsoft,微软服务",
    "GEOSITE,google,谷歌服务",
    "RULE-SET,GFWList,选择代理",
    "GEOIP,cn,DIRECT",
    "MATCH,Final"
  ];
  return config;
};
