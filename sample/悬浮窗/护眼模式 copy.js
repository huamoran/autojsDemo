var w = floaty.rawWindow(
    <frame id="fm" gravity="center" bg="#44ffcc00">
        <text id="msg" textSize="40sp" typeface="monospace" textStyle="bold" line="3000" textColor="black" 
        text="this is a story aobut me .all right do you can you change you 
        here"></text>
    </frame>
);

w.setSize(-1, -1);
w.setTouchable(false);

setTimeout(()=>{
    w.close();
}, 8000);