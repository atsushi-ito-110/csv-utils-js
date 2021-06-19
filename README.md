# Overview
csv文字列からObjectの配列に変換します

## Execution
```
npm run test
```

### Result
```
$ npm run test:example

fileBody id,name,profile.birth.year,profile.birth.day,profile.blood,profile.address,hoge.fuga.hoge.fuga
1,ito,1990,06-06,O,Minato-Ku Tokyo,aaa
2,saito,1991,06-06,O,Minato-Ku Tokyo,aaa
3,naito,1991,06-06,O,Minato-Ku Tokyo,bbb

usres: [
  {
    "id": "1",
    "name": "ito",
    "profile": {
      "birth": {
        "year": "1990",
        "day": "06-06"
      },
      "blood": "O",
      "address": "Minato-Ku Tokyo"
    },
    "hoge": {
      "fuga": {
        "hoge": {
          "fuga": "aaa"
        }
      }
    }
  },
  ...
}]
```
