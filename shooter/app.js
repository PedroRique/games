var app = angular.module('game', []);

app.controller('canvasCtrl', ['$scope', '$timeout', '$interval', function($scope, $timeout, $interval){            
    $scope.charPos = {x: 0, y: 0};
    
    $scope.dashing = false;
    $scope.walking = false;
    $scope.walks = [];
    $scope.score = 0;
    $scope.abilities = [
        {status: true,cd: 0.1,id: 'Q',time: 0},
        {status: true,cd: 2,id: 'W',time: 2}
    ];

    $scope.mobs = [];
    $scope.orbs = [];
    $scope.mobSpeed = 20;

    $scope.qSound = new Audio('assets/sounds/q.mp3');
    $scope.hitSound = new Audio('assets/sounds/hit.mp3');
    $scope.wSound = new Audio('assets/sounds/w.mp3');
    $scope.winSound = new Audio('assets/sounds/win.mp3');
    
    $scope.bgSound = new Audio('assets/sounds/bg.mp3');
    $scope.bgSound.volume = 0.2;
    $scope.bgSound.loop = true;

    $scope.startGame = function(){
        $scope.bgSound.play();
    }

    $scope.goToLocation = function(e){
        $scope.cancelWalk();
        if(!$scope.dashing){
            $scope.walk([$scope.charPos.x,$scope.charPos.y], [e.pageX, e.pageY], 20);
        }
    }
    
    $scope.getPress = function(e){
        $scope.ability(e.key);
    }

    $scope.getPointerPos = function(e){
        $scope.x = e.clientX;
        $scope.y = e.clientY;
    }

    $scope.ability = function(key){

        if(key == 'q' && $scope.abilities[0].status){
            var orb = {x: $scope.charPos.x,y: $scope.charPos.y, show: true, id: $scope.orbs.length};
            $scope.orbs.push(orb);
            $scope.shoot(orb, 10);
            $scope.setCoolDown(0);

        }

        if(key == 'w' && $scope.abilities[1].status){
            $scope.dashing = true;
            $scope.charPos = {x: $scope.x, y: $scope.y};
            $scope.wSound.play();
            $scope.setCoolDown(1);
            $timeout(function(){
                $scope.dashing = false;
            },250);
        }

    }
    $scope.shoot = function(orb, precision){
        var end = [$scope.x, $scope.y];
        var start = [orb.x, orb.y];

        v = [end[0] - start[0], end[1] - start[1]];
        vSize = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
        vUnit = [v[0]/vSize,v[1]/vSize]
        vector = [vUnit[0] * precision, vUnit[1] * precision];

        $scope.shootStep(orb, vector[0], vector[1], 0);
    }

    $scope.shootStep = function(orb, x, y, stack){
        $timeout(function(){
            orb.show = false;
        },2000);
        $scope.qSound.play();

        if(orb.x + x > window.innerWidth || orb.y + y > window.innerHeight || orb.x + x < 0 || orb.y + y < 0){
            
        }else{
            orb.x = orb.x + x;
            orb.y = orb.y + y;
            if(stack == 0){
                $timeout(function(){
                    var miss = true;

                    $scope.mobs.forEach(function(mob, i, mobs){
                        if((mob.x < orb.x && orb.x < mob.x + 50) && (mob.y < orb.y && orb.y < mob.y + 50) && !mob.dead){
                            $timeout(function(){
                                $scope.hitSound.play();
                                mob.dead = true;
                                $scope.score += 50;
                                $scope.mobs = mobs.filter(function(a){
                                    return !a.dead;
                                });
                            },50)
                            miss = false;
                        }
                    });
                    if(miss){
                        $scope.shootStep(orb, x, y, ++stack);
                    }
                })
            }else{
                var miss = true;

                $scope.mobs.forEach(function(mob, i, mobs){
                    if((mob.x < orb.x && orb.x < mob.x + 50) && (mob.y < orb.y && orb.y < mob.y + 50) && !mob.dead){
                        $timeout(function(){
                            $scope.hitSound.play();
                            mob.dead = true;
                            $scope.score += 50;
                            $scope.mobs = mobs.filter(function(a){
                                return !a.dead;
                            });
                            if($scope.mobs.length == 0){
                                $scope.winSound.play();

                                $timeout(function(){
                                    $scope.addMobs(10);
                                }, 500)
                            }
                        },50)
                        miss = false;
                        
                    }
                });
                if(miss){
                    $scope.shootStep(orb, x, y, ++stack);
                }
            }
            
        }
        
    }

    $scope.setCoolDown = function(key){
        $scope.abilities[key].status = false;
        var time = $scope.abilities[key].time;

        $timeout(function(){
            $scope.abilities[key].status = true;
            $interval.cancel(interval);
            $scope.abilities[key].time = time;
        }, $scope.abilities[key].cd * 1000);

        var interval = $interval(function(){
            $scope.abilities[key].time = $scope.abilities[key].time - 1;
        }, 1000)
    }

    $scope.walk = function(start, end, speed){
        
        v = [end[0] - start[0], end[1] - start[1]];
        vSize = Math.sqrt(Math.pow(v[0], 2) + Math.pow(v[1], 2));
        vUnit = [v[0]/vSize,v[1]/vSize];
        vector = [vUnit[0] * speed, vUnit[1] * speed];

        $scope.step(start, end, vector);
    }

    $scope.step = function(start, end, vector){

        $scope.charPos.x = start[0] + vector[0]; 
        $scope.charPos.y = start[1] + vector[1];
        // var walk = $timeout(function(){
        //     $scope.step([$scope.charPos.x, $scope.charPos.y], end, vector);
        // }, 150);

        // $scope.walks.push(walk);
    }

    $scope.cancelWalk = function(){
        $scope.walks.forEach(function(timeout){
            $timeout.cancel(timeout);
        });
    }

    $scope.addMobs = function(n){
        for (let i = 0; i < n; i++) {
            var mobX = Math.random() * window.innerWidth;
            var mobY = Math.random() * window.innerHeight;
            $scope.mobs.push({x: mobX,y: mobY,id: i, dead: false});
        }

        $scope.moveMobs();
    }

    $scope.moveMobs = function(){
        $scope.mobs.forEach(function(mob){
        
            var x = $scope.getRandomArbitrary(-1,1) * $scope.mobSpeed;
            var y = $scope.getRandomArbitrary(-1,1) * $scope.mobSpeed;

            if(mob.x + x < window.innerWidth && mob.y + y < window.innerHeight && mob.x + x > 0 && mob.y + y > 0){
                mob.x = mob.x + x;
                mob.y = mob.y + y;
                var char = $scope.charPos;
                if((mob.x < char.x + 10) && (char.x + 10 < mob.x + 50) && (mob.y < char.y + 10) && (char.y < mob.y + 50)){
                    console.log('tocou');
                    // alert('Game over');
                }
            }
        });

        $timeout(function(){
            $scope.moveMobs();
        }, 500);
    }

    $scope.getRandomArbitrary = function(min, max) {
        return Math.random() * (max - min) + min;
    }


    $scope.addMobs(1);
}]);