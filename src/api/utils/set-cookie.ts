interface CookieProps {
  expires?: number | Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  "max-age"?: number;
}

export function setCookie(name: string, value: string, props?: CookieProps) {
  props = props || {};
  let exp = props.expires;

  if (typeof exp === "number" && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp instanceof Date && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);
  let updatedCookie = name + "=" + value;

  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName as keyof CookieProps];

    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}
