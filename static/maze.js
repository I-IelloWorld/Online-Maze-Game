var aa=14;
    var chess = document.getElementById("mycanvas");
    var context = chess.getContext('2d');

    var tree = [];//Storage connected or not
    var isling=[];//Determine whether to connect
    for(var i=0;i<aa;i++){
        tree[i]=[];
        for(var j=0;j<aa;j++){
            tree[i][j]=-1;// The initial value is 0
        }
    }  for(var i=0;i<aa*aa;i++){
        isling[i]=[];
        for(var j=0;j<aa*aa;j++){
            isling[i][j]=-1;// The initial value is 0
        }
    }

    function drawChessBoard(){// painting
        for(var i=0;i<aa+1;i++){
            context.strokeStyle='gray';// Optional region
            context.moveTo(15+i*30,15);// Draw 15 vertical lines 30px apart;
            context.lineTo(15+i*30,15+30*aa);
            context.stroke();// Draw 15 horizontal lines 30px apart; The board is 14 x 14;
            context.moveTo(15,15+i*30);
            context.lineTo(15+30*aa,15+i*30);
            context.stroke();
        }
    }
    // Draw the checkerboard





    function getnei(a)// Get the neighbor number
    {
        var x=parseInt(a/aa);// Be exact to an integer
        var y=a%aa;
        var mynei=new Array();// Save the neighbor
        if(x-1>=0){mynei.push((x-1)*aa+y);}
        if(x+1<14){mynei.push((x+1)*aa+y);}
        if(y+1<14){mynei.push(x*aa+y+1);}
        if(y-1>=0){mynei.push(x*aa+y-1);}
        var ran=parseInt(Math.random() * mynei.length );
        return mynei[ran];

    }
    function search(a)// Find the root node
    {
        if(tree[parseInt(a/aa)][a%aa]>0)// Indicates a child node
        {
            return search(tree[parseInt(a/aa)][a%aa]);
        }
        else
            return a;
    }
    function union(a,b)// merge
    {
        var a1=search(a);// a root
        var b1=search(b);// b root
        if(a1==b1){}
        else
        {
            if(tree[parseInt(a1/aa)][a1%aa]<tree[parseInt(b1/aa)][b1%aa])
            {
                tree[parseInt(a1/aa)][a1%aa]+=tree[parseInt(b1/aa)][b1%aa];// Add the numbers
                tree[parseInt(b1/aa)][b1%aa]=a1;      // B becomes a subtree of A. B's root b1 points directly to A;
            }
            else
            {
                tree[parseInt(b1/aa)][b1%aa]+=tree[parseInt(a1/aa)][a1%aa];
                tree[parseInt(a1/aa)][a1%aa]=b1;// The tree of A becomes a subtree of the tree of B
            }
        }
    }

    function drawline(a,b)// Draw a line to determine whether it is up or down
    {

        var x1=parseInt(a/aa);
        var y1=a%aa;
        var x2=parseInt(b/aa);
        var y2=b%aa;
        var x3=(x1+x2)/2;
        var y3=(y1+y2)/2;
        if(x1-x2==1||x1-x2==-1)// The left and right directions need to be underlined
        {

            context.strokeStyle = 'white';

            context.clearRect(29+x3*30, y3*30+16,2,28);

        }
        else
        {

            context.strokeStyle = 'white';

            context.clearRect(x3*30+16, 29+y3*30,28,2);

        }
    }




    var a=aa*30-10,b=aa*30-10;//destination
    var x = 20, y =140;//The player2 position
    var x2 = 140,y2 = 20 ;//The player1 position
    i = 0;
    j = 0;
    totali = 100;
    totalj = 100;//steps in one level

    finali = 0;
    finalj = 0;//used steps
    st = document.getElementById('state');

    function load() {
        var canvas = document.getElementById("mycanvas");
        Context = canvas.getContext("2d");
        Context2 = canvas.getContext("2d");
        context.fillStyle = "red";
        context.fillRect(a, b, 20, 20);
        Context.fillStyle = "blue";
        Context.fillRect(x, y, 20, 20);
        Context2.fillStyle = "green";
        Context2.fillRect(x2, y2, 20, 20);



        canvas.addEventListener('keydown', doKeyDown, true);
        canvas.focus();
        window.addEventListener('keydown', doKeyDown, true);
    }

    function doKeyDown(e) {

        var keyID = e.keyCode ? e.keyCode : e.which;// Get the Unicode code value for the key

        if(i<7&&totali>0){
            if (keyID === 38 ) { // The movement direction of the upper key
                if(y-30<0){}
                else if(isling[(x-20)/30*aa+(y-20)/30][((x-20)/30)*aa+(y-20)/30-1]!=1) {}
                else {
                    clearCanvas();
                    Context.fillStyle = "blue";
                    y = y - 30;
                    Context.fillRect(x, y, 20, 20);

                    e.preventDefault();
                    gameover();
                    show();
                    i = i +1;
                    totali = totali -1;
                }
            }
            if (keyID === 39 ) { // The movement direction of the right key
                if(x+30>15+30*aa){}
                else if(isling[(x-20)/30*aa+(y-20)/30][((x-20)/30)*aa+(y-20)/30+aa]!=1) {}
                else{
                    clearCanvas();
                    Context.fillStyle = "blue";
                    x=x+30;
                    Context.fillRect(x, y, 20, 20);

                    e.preventDefault();
                    gameover();
                    show();
                    i = i +1;
                    totali = totali -1;
                }
            }
            if (keyID === 40 ) { // The movement direction of the down key
                if(y+30>15+30*aa){}
                else if(isling[(x-20)/30*aa+(y-20)/30][((x-20)/30)*aa+(y-20)/30+1]!=1) {}
                else{
                    clearCanvas();
                    Context.fillStyle = "blue";
                    y = y + 30;
                    Context.fillRect(x, y, 20, 20);

                    e.preventDefault();
                    gameover();
                    show();
                    i = i +1;
                    totali = totali -1;
                }
            }
            if (keyID === 37 ) { // The movement direction of the left key
                if(x-30<0){}
                else if(isling[(x-20)/30*aa+(y-20)/30][((x-20)/30)*aa+(y-20)/30-aa]!=1) {}
                else{
                    clearCanvas();
                     Context.fillStyle = "blue";
                    x = x - 30;
                    Context.fillRect(x, y, 20, 20);

                    e.preventDefault();
                    gameover();
                    show();
                    i = i +1;
                    totali = totali -1;

                }}
        }
        else if(j>=7){
            h=m=s=ms= 0;
            i = 0;


        }

        if(j<7&&totalj>0){
            if ( keyID === 87) { //The movement direction of the w key
                if(y2-30<0){}
                else if(isling[(x2-20)/30*aa+(y2-20)/30][((x2-20)/30)*aa+(y2-20)/30-1]!=1) {}
                else {
                    clearCanvas2();
                    Context2.fillStyle = "green";
                    y2 = y2 - 30;
                    Context2.fillRect(x2, y2, 20, 20);
                    e.preventDefault();
                    gameover();
                    show();
                    j = j + 1;
                    totalj = totalj -1;
                }
            }
            if ( keyID === 68) { // The movement direction of the D key
                if(x2+30>15+30*aa){}
                else if(isling[(x2-20)/30*aa+(y2-20)/30][((x2-20)/30)*aa+(y2-20)/30+aa]!=1) {}
                else{
                    clearCanvas2();
                    Context2.fillStyle = "green";
                    x2=x2+30;
                    Context2.fillRect(x2, y2, 20, 20);

                    e.preventDefault();
                    gameover();
                    show();
                    j = j + 1;
                    totalj = totalj -1;
                }
            }
            if ( keyID === 83) { // The movement direction of the S key
                if(y2+30>15+30*aa){}
                else if(isling[(x2-20)/30*aa+(y2-20)/30][((x2-20)/30)*aa+(y2-20)/30+1]!=1) {}
                else{
                    clearCanvas2();
                    Context2.fillStyle = "green";
                    y2 = y2 + 30;
                    Context2.fillRect(x2, y2, 20, 20);

                    e.preventDefault();
                    gameover();
                    show();
                    j = j + 1;
                    totalj = totalj -1;
                }
            }
            if ( keyID === 65) { // The movement direction of the A key
                if(x2-30<0){}
                else if(isling[(x2-20)/30*aa+(y2-20)/30][((x2-20)/30)*aa+(y2-20)/30-aa]!=1) {}
                else{
                    clearCanvas2();
                    Context2.fillStyle = "green";
                    x2 = x2 - 30;
                    Context2.fillRect(x2, y2, 20, 20);

                    e.preventDefault();
                    gameover();
                    show();
                    j = j + 1;
                    totalj = totalj -1;

                }}
        }
        else if(i>=7){
            h=m=s=ms= 0;
            j=0;

        }
    }
    function clearCanvas() {// Clear the traces between

        Context.clearRect(x, y, 20, 20);
        if(x === x2&&y === y2){
            Context2.fillStyle = "green";
            Context2.fillRect(x2, y2, 20, 20);
        }


    }
    function clearCanvas2(){
        Context2.clearRect(x2, y2, 20, 20);
        if(x2 === x&&y2 === y){
            Context.fillStyle = "blue";
            Context.fillRect(x, y, 20, 20);
        }
    }
    var end=false;
    function gameover()
    {
        if(x>=a&&y>=b&&totali>=0)
        {
            end=true;
            finali = finali +1;

            i = 0;
            j = 0;

            totali = 101;
            totalj = 100;

        }
        if(x2>=a&&y2>=b&&totalj>=0)
        {
            end=true;

            finalj = finalj +1;
            i = 0;
            j = 0;
            totali = 100;
            totalj = 101;
        }
    }
    function show()
    {
        if(end==true)
        {
            // stop();
            aa=aa+2;
            if(aa==20){


                if(finali>finalj){
                    alert("player1 win!");
                }
                else if(finali<finalj){
                    alert("player2 win!");
                }
                else {
                    alert("draw");
                }
                stop();

            }
            else{
                end=false;
                Context.clearRect(0, 0, 600, 600);

                for(var i=0;i<aa;i++){
                    tree[i]=[];
                    for(var j=0;j<aa;j++){
                        tree[i][j]=-1;
                    }
                }  for(var i=0;i<aa*aa;i++){
                    isling[i]=[];
                    for(var j=0;j<aa*aa;j++){
                        isling[i][j]=-1;
                    }
                }
                drawChessBoard();
                while(search(4)!=search(aa*aa-1))
                {
                    var num = parseInt(Math.random() * aa*aa );
                    var neihbour=getnei(num);
                    if(search(num)==search(neihbour)){continue;}
                    else
                    {
                        isling[num][neihbour]=1;isling[neihbour][num]=1;
                        drawline(num,neihbour);
                        union(num,neihbour);

                    }
                }
                while(search(56)!=search(aa*aa-1))
                {
                    var num = parseInt(Math.random() * aa*aa );
                    var neihbour=getnei(num);
                    if(search(num)==search(neihbour)){continue;}
                    else
                    {
                        isling[num][neihbour]=1;isling[neihbour][num]=1;
                        drawline(num,neihbour);
                        union(num,neihbour);

                    }
                }
                a=aa*30-10,b=aa*30-10;
                x = 20, y =140;
                x2 = 140, y2 =20;
                load();

            }

        }
    }
    var h=m=s=ms= 0;  // Define hours, minutes, seconds, milliseconds and initialize to 0;
    var time=0;
    var time2 = 0;
    var i=0;
    function timer(){   // Define the timing function
        ms=ms+50;         // ms
        if(ms>=1000){
            ms=0;
            s=s+1;         // second
        }
        if(s>=60){
            s=0;
            m=m+1;        //minute
        }
        if(m>=60){
            m=0;
            h=h+1;        //hour
        }

        if(s>15){
            h=m=s=ms= 0;
            if((i>0&&i<7)){
                 i=7;
                 j=0;
            }
            if((j>0&&j<7)) {
                j=7;
                i=0;

            }

        }
        str =toDub(h)+"h"+toDub(m)+"m"+toDub(s)+"s"+toDubms(ms)+"ms";
        mytime = document.getElementById('mytime');
        mytime.innerHTML = str;

    }


    function start(){  //start\
        drawChessBoard();// Draw the checkerboard

         while(search(4)!=search(aa*aa-1)) {
            var num = parseInt(Math.random() * aa*aa );// Generate a random number less than 196
            var neihbour=getnei(num);
            if(search(num)==search(neihbour)){continue;}
            else
            {
                isling[num][neihbour]=1;isling[neihbour][num]=1;
                drawline(num,neihbour);
                union(num,neihbour);

            }
            }
            while(search(56)!=search(aa*aa-1)) {
            var num = parseInt(Math.random() * aa*aa );// Generate a random number less than 196
            var neihbour=getnei(num);
            if(search(num)==search(neihbour)){continue;}
            else
            {
                isling[num][neihbour]=1;isling[neihbour][num]=1;
                drawline(num,neihbour);
                union(num,neihbour);

            }
            }
        load();

        time=setInterval(timer,50);
    }



    function toDub(n){  // add 0
        if(n<10){
            return "0"+n;
        }
        else {
            return ""+n;
        }
    }

    function toDubms(n){  // add 0
        if(n<10){
            return "00"+n;
        }
        else {
            return "0"+n;
        }

    }
    function renovates(){
        document.location.reload();

        i = 0;
        j = 0;
        totali = 100;
        totalj = 100;
    }







    function showstep() {

        p1 = document.getElementById('player1');

        p1.innerHTML = totali;

        p2 = document.getElementById('player2');

        p2.innerHTML = totalj;

        if((i>0&&i<7)||(j>=7)){
            if(s<15){
                st.innerHTML = "player1";
            }
            else {
                st.innerHTML = "player2";

            }


        }
        if((j>0&&j<7)||(i>=7)) {
            if (s < 15) {
                st.innerHTML = "player2";
            } else {
                st.innerHTML = "player1";



            }
        }

    }
    function step(){
        time2=setInterval(showstep,50);

    }
    step();


/* reference:
https://blog.csdn.net/qq_40693171/article/details/117072232
*/