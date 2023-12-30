import vnFlag from "assets/flag/vn.svg";
import jpFlag from "assets/flag/jp.svg";
import cnFlag from "assets/flag/cn.svg";
import krFlag from "assets/flag/kr.svg";
import khFlag from "assets/flag/kh.svg";
import thFlag from "assets/flag/th.svg";
const nationality = [
  { value: "VN", label: "ベトナム", flag: vnFlag },
  { value: "JP", label: "日本", flag: jpFlag },
  { value: "CN", label: "中国", flag: cnFlag },
  { value: "KR", label: "韓国", flag: krFlag },
  { value: "KH", label: "カンボジア", flag: khFlag },
  { value: "TH", label: "タイ", flag: thFlag },
  // { value: "US", label: "アメリカ", flag: jpFlag },
  // { value: "UK", label: "イギリス", flag: jpFlag },
  // { value: "FR", label: "フランス", flag: jpFlag },
  // { value: "DE", label: "ドイツ", flag: jpFlag },
  // { value: "IT", label: "イタリア", flag: jpFlag },
  // { value: "ES", label: "スペイン", flag: jpFlag },
  { value: "OTHER", label: "その他", flag: jpFlag },
] as const;
export default { nationality };
