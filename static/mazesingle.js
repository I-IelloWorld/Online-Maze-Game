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
            context.stroke();
            context.moveTo(15,15+i*30);// Draw 15 horizontal lines 30px apart; The board is 14 x 14;
            context.lineTo(15+30*aa,15+i*30);
            context.stroke();
        }
    }






    function getnei(a)// Be exact to an integer
    {
        var x=parseInt(a/aa);// Save the neighbor
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
    function value(a)// Find the size of the tree
    {
        if(tree[parseInt(a/aa)][a%aa]>0)// Indicates a child node
        {
            return tree[parseInt(a/aa)][a%aa]=value(tree[parseInt(a/aa)][a%aa]);
        }
        else
            return -tree[parseInt(a/aa)][a%aa];
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
                tree[parseInt(b1/aa)][b1%aa]=a1;       // B becomes a subtree of A. B's root b1 points directly to A;
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


    var a=aa*30-10,b=aa*30-10;
    var x = 20, y =20;


    totali = 100;
    alli = 0



    function load() {
        var canvas = document.getElementById("mycanvas");
        Context = canvas.getContext("2d");

        context.fillStyle = "red";
        context.fillRect(a, b, 20, 20);
        Context.fillStyle = "blue";
        Context.fillRect(x, y, 20, 20);



        canvas.addEventListener('keydown', doKeyDown, true);
        canvas.focus();
        window.addEventListener('keydown', doKeyDown, true);
    }

    function doKeyDown(e) {

        var keyID = e.keyCode ? e.keyCode : e.which;// Get the Unicode code value for the key

        if(totali>=0){
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

                    totali = totali -1;

                }}
        }


    }
    function clearCanvas() {// Clear the traces between

        Context.clearRect(x, y, 20, 20)


    }
    var end=false;
    function gameover()
    {
        if(x>=a&&y>=b&&totali>=0)
        {
            alli = alli + totali;

            end=true;
            totali = 101;



        }
        if(totali<=0){
            alert("You lose");
        }

    }

    var h=m=s=ms= 0;// Define hours, minutes, seconds, milliseconds and initialize to 0;

    var ms1= s1 = m1=0;
    var time=0;

    var i=0;
    function timer(){   // Define the timing function
        ms=ms+50;
        if(ms>=1000){
            ms=0;
            s=s+1;
        }
        if(s>=60){
            s=0;
            m=m+1;
        }
        if(m>=60){
            m=0;
            h=h+1;
        }



        str =toDub(h)+"h"+toDub(m)+"m"+toDub(s)+"s"+toDubms(ms)+"ms";
        mytime = document.getElementById('mytime');
        mytime.innerHTML = str;

    }



    function start(){  //start
        drawChessBoard();// Draw the checkerboard

         while(search(0)!=search(aa*aa-1)) {
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

    function stop(){  // pause

        clearInterval(time);
    }

    function toDub(n){
        if(n<10){
            return "0"+n;
        }
        else {
            return ""+n;
        }
    }

    function toDubms(n){
        if(n<10){
            return "00"+n;
        }
        else {
            return "0"+n;
        }

    }
    function renovates(){
        i = 0;
        totali = 60;

        document.location.reload();


    }

    function showstep() {

        p1 = document.getElementById('player1');

        p1.innerHTML = totali;


    }
    function step(){
        time2=setInterval(showstep,50);

    }
    step();
    function show()
    {
        if(end==true)
        {
            // stop();
            aa=aa+2;
            if(aa==20){
                var ui =document.getElementById("exit");
                ui.style.display="none";
                var ui =document.getElementById("save");
                ui.style.display="block";
                str =toDub(h)+"h"+toDub(m)+"m"+toDub(s)+"s"+toDubms(ms)+"ms";


                console.log(str);

                alert("Game over\n"+"Total number of steps used:"+(300-alli)+"\n"+"Completion time:"+str);
                PostToServer();



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
                while(search(0)!=search(aa*aa-1))
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
                x = 20, y =20;

                load();

            }

        }
    }


    function PostToServer() {
      data={'step':(300-alli),'timeh':h,'timem':m,'times':s,'timems':ms}
      var httpRequest = new XMLHttpRequest();
      httpRequest.open("POST", "/post_rank", true);
      httpRequest.setRequestHeader("Content-Type", "application/json");
      httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
          alert('Congratulation!!!');
        }
      }
      httpRequest.send(JSON.stringify(data));
    }


/* reference:
https://blog.csdn.net/qq_40693171/article/details/117072232
*/