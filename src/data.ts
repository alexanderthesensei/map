export const map: Map = {
  url: "/map/index.svg",
  entries: [
    {
    "url": "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.hdqwalls.com%2Fwallpapers%2Fbear-lake-reflection-at-rocky-mountain-national-park-4k-w2.jpg&f=1&nofb=1&ipt=3a1d2b93f642f992530a4e8322b36aa4ed087682725bd49d3be13712f40f4383&ipo=images",
    "entries": [
        {
            "title": "эта гара",
            "description": "гара эта кусок камня",
            "markerX": 63.12106368089573,
            "markerY": 26.715282518008028,
            "children": []
        },
        {
            "title": "эта лужа",
            "description": "аш оо в большом количистви",
            "markerX": 40.587823652904135,
            "markerY": 83.51155243818256,
            "children": []
        },
        {
            "title": "эта дерива",
            "description": "ано зилёнайэ",
            "markerX": 7.977606717984605,
            "markerY": 35.129544728404255,
            "children": [imgToMap("https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.lovethegarden.com%2Fsites%2Fdefault%2Ffiles%2Fcontent%2Farticles%2FUK_old-english-oak-tree.jpg&f=1&nofb=1&ipt=6da05618bbfb92bc07220e4cf77c1196f03bbfc2d18dac84d100f38fbb888b26&ipo=images")]
        }
    ]
},
    {
      title: "2.5d",
      children: [
        {
          url: "https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Forig11.deviantart.net%2F562f%2Ff%2F2016%2F089%2Fc%2Fb%2Fcb44bc8b275d1eafbbf7fcf13c400b7c-d9x29tt.jpg&f=1&nofb=1&ipt=0cc2a54840da7c00628d6e2af39e857f60d4fb1fd9501f9be5ba5a0752a27e8b&ipo=images",
          entries: [
            {
              title: "test",
              description: "lorem ipsum dolor sit amet",
              children: [
                "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F8b%2Ffe%2F2f%2F8bfe2fc268abda981133434a4c1ec8b3.jpg&f=1&nofb=1&ipt=9efc334a3893a5aa7ab67842980a322b1b8ee13b23c277477e1f301a90a0fe2c&ipo=images",
              ].map(imgToMap),
              markerX: 16,
              markerY: 13,
            },
          ],
        },
      ],
      markerX: 83.5,
      markerY: 56,
    },
  ],
};

// ------------------------------------------------------------------------------------------------------------------- //
// ------------------------------ КОНЕЦ РЕДАКТИРУЕМОЙ ПОЛЬЗОВАТЕЛЕМ ЧАСТИ ФАЙЛА -------------------------------------- //
// ------------------------------------------------------------------------------------------------------------------- //


// todo rename
export type Map = {
  url: string;
  entries: Entry[];
};

// todo rename to point
export type Entry = {
  title: string;
  description?: string;
  children: Map[];

  markerX: number;
  markerY: number;
};

function imgToMap(url: string): Map {
  return {
    url,
    entries: [],
  };
}
