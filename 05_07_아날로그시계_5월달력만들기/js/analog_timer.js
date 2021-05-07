;(function($){

    var timer = {      
        init: function(){
          
          this.analogTimerFn();

        },
        analogTimerFn: function(){
            var today   = null;    //날짜 객체
            var hours   = null; //시
            var minutes = null; //분
            var seconds = null; //초

            var year    = null; //년
            var month   = null; //월
            var date    = null; //일
            var day     = null; //요일
            
            var y       = 0;  //년 카운트 변수       
            var m       = 0;  //월 카운트 변수


            var timerImg2 = $('.timer-img2'); //시
            var timerImg3 = $('.timer-img3'); //분
            var timerImg4 = $('.timer-img4'); //초
            var dateBox   = $('.date-box span');   //날짜박스

            var disitalBox = $('.disital-box');
            var txt       = '';
            

            function timerFn(){
                today   = new Date();        
                //시간 - 시:분:초
                hours   = today.getHours();    //시
                minutes = today.getMinutes();  //분
                seconds = today.getSeconds();  //초
                

                //날짜 - 년-월-일-요일
                year    = today.getFullYear(); 
                month   = today.getMonth()+1;  
                date    = today.getDate();    
                day     = today.getDay();    
                
                yoil    = ['일','월','화','수','목','금','토']; 
                
                txt = year + '-' +  (month+1) + '-' + date +'-' + yoil[day];
               
                //현재 시각
                timerImg2.css({ transform: 'rotate(' + ((hours*30)+(0.5*minutes)) + 'deg)' }); 
                timerImg3.css({ transform: 'rotate(' + (minutes*6) + 'deg)' }); 
                timerImg4.css({ transform: 'rotate(' + (seconds*6) + 'deg)' });                 

                //현재 날짜
                dateBox.html( txt );

            }


            function disitalFn(){

                today   = new Date();
                hours   = today.getHours();   
                if(hours<10){hours= '0' +hours;}
                else{hours=hours;}

                minutes = today.getMinutes(); 
                if(minutes<10){minutes= '0' + minutes;}
                else{minutes = minutes;}

                seconds = today.getSeconds(); 
                if(seconds<10){seconds= '0' + seconds;}
                else{seconds = seconds;}
                


                txt2 = hours + ':' + minutes + ':' + seconds
                disitalBox.html(txt2);
            }


            setInterval(function(){
                timerFn();
                disitalFn();
            }, 1000);

            timerFn();
            disitalFn();

            var firstDay = null;
            var lastDate = null;

            // firstDay = new Date('2021-5-1').getDay(); 
            // lastDate = new Date(2021, 5, 0).getDate();
            // for(var i=1; i<=lastDate; i++){
            //     var day = new Date('2021-5-'+i).getDay();  
            //     console.log('5월'+ i + '일 ' + yoil[day] +'요일');
            // }
            
            //5월 달력 일자 출력 42칸(td)
            //1. 5월 1일 첫날 요일(토 index=6)에 맞게 칸(column)을 설정 - firstDay

            var col = null; //칸번호
            var prevLastDate = null; //이전 달 마지막 일자 기억변수
            var cnt = 0;
            
            function calendarFn(y,m){

                col = null;
                prevLastDate = null;
                cnt = 0;
                
                $('.calendar .title').html( y + '년' + m  + '월'  );
                $('td').removeClass('now');

                //오늘 날짜의 달 가져오기
                //오늘 날짜의 일 가져오기
                var nowYear  = new Date().getFullYear();
                var nowMonth = new Date().getMonth()+1; //0~11 반드시 1을 더한다.
                var nowDate  = new Date().getDate();

                console.log( nowMonth, m);
                
                console.log( nowYear,  y);
                


                //이달 달력 채우기
                firstDay = new Date(y + '-' + m + '-' + 1).getDay(); //첫날 요일 (토 index=6)
                col = firstDay; //몇번째 칸(6)에서 시작을 하는가를 결정 카운트 ~ 마지막날 까지(lastDate)
                
                prevLastDate = new Date(y, m-1, 0).getDate();     //4월 마지막 일자 가져오기
                
                lastDate = new Date(y, m, 0).getDate(); //5월 마지막 일자 구하기
                                

                for(var i=1; i<=lastDate; i++){ //i 변수 = 날짜
                    if(col !== null){
                        $('td').eq(col).html(i); //td 칸의 시작번호 부터 1씩 증가 - 마지막 날짜 까지
                        
                        //조건 1 월(달) 조건이 만족
                        //조건 2 일(날) 조건이 만족
                       
                        if( nowYear == y && nowMonth == m ){
                            if(nowDate == i){

                                $('td').eq(col).addClass('now');

                            }
                        
                        }
                                          
                        else{
                        
                            $('td').removeClass('now');
                        
                        }

                        col++; //다음칸으로 증가 누적 변수

                    }
                }

                //이번달 이전 빈칸 채우기
                //이전달 마지막 일자
                console.log('이전달 마지막 일자',prevLastDate);
                
                //이전달 첫날 이전에 빈칸을 이전달 마지막 날짜(prevLastDate)로 차례로 채우기
                //for(var i=이번달 첫 요일 인덱스 값(6)-1; i>=0;(6,5,4,3,2,1,0) i--){
                
                for(var i=firstDay-1; i>=0; i--){

                    //$('td').removeClass('color1'); 버튼클릭시 다음or이전 이동시 초기화
                    $('td').eq(i).html(prevLastDate).addClass('color1');
                    prevLastDate--;

                }
                
              
                //이번달 다음 빈칸 채우기
                //이번달 칸번호 카운트변수가 다음 빈칸 첫칸으로 사용 그리고 증가 카운트
                //td.length 미만까지 42 (index=41 까지)

                for(var i=col; i<$('td').length; i++){
                    cnt++;
                    $('td').eq(i).html(cnt).addClass('color1');
                }

            }

            //달력 함수 실행
            calendarFn( year,month ); //함수를 호출할때 적용하는 값 = 아규먼트

            y = year;  //현재
            m = month; //현재

            //다음 달 버튼 클릭

            $('.next-btn').on({
                click:function(){
                    
                    m ++;
                    if(m>12){
                        y++; //년수 증가
                        m=1; //12월에서 1월
                    }
                    console.log( y + '년도' + m +'월' );
                    $('td').removeClass('color1'); //다음 빈칸 addclass 삭제
                    calendarFn( y,m); 
                }
            })

            //이전 달 버튼 클릭

            $('.prev-btn').on({
                click:function(){
                    m--;
                    if(m<1){
                        y--;  //년수 감소
                        m=12; //1월에서 12월로
                    }
                    console.log( y + '년도' + m +'월' );
                    $('td').removeClass('color1'); //이전 빈칸 addclass 삭제
                    calendarFn( y,m);
                }
            })




        }    
    } //객체 끝

    timer.init();


})(jQuery);