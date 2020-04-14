import Router from "next/router";

/*
 * @Util redirect
 * @Desc Redirects to a given target (Preferred as it supports both client and server redirects)
 * @Access Public
 * @Param? Context
 * @Param Target
 */
export default (context, target) => {
  // Server redirect
  if (context.res) {
    // server
    // 303: "See other"
    context.res.writeHead(303, {
      Location: target
    });
    context.res.end();
  } else {
    // Client redirect
    // In the browser, we just pretend like this never even happened ;)
    Router.replace(target);
  }
};
