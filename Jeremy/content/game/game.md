+++
title = 'Game'
date = 2024-09-14T15:18:03Z
draft = false
+++
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Snake Game</title>
    <style>
        canvas {
            display: block;
            margin: 0 auto;
            background-color: #2E2D30;
        }
    </style>
</head>
<body>
    <canvas id="gameCanvas" width="600" height="600"></canvas>
    <script>
        const canvas = document.getElementById('gameCanvas');
        const ctx = canvas.getContext('2d');
        const w = canvas.width;
        const h = canvas.height;

        let start = false;
        let lose = false;
        let d = [0, 20, 20, 0, 0, -20, -20, 0];  // directions: down, right, up, left
        let snake = [w / 2, h / 2, 0, -20, w / 2, h / 2 + 20, 0, -20, w / 2, h / 2 + 40, 0, -20, w / 2, h / 2 + 60, 0, -20];
        let movea = 0;
        let moveb = 0;
        let choicex = [];
        let caught = true;
        let ax = 0;
        let ay = 0;

        for (let k = 0; k <= w - 20; k += 20) {
            choicex.push(k);
        }

        function gameLoop() {
            setTimeout(() => {
                requestAnimationFrame(gameLoop);
                draw();
            }, 1000 / 8);  // Frame rate of 8
        }

        function draw() {
            ctx.clearRect(0, 0, w, h);

            if (start && !lose) {
                // Draw/move snake
                for (let i = 0; i < snake.length; i += 4) {
                    ctx.fillStyle = 'rgb(37,89,0)';
                    snake[i] += snake[i + 2];
                    snake[i + 1] += snake[i + 3];

                    if (i === 4) {
                        movea = snake[i + 2];
                        moveb = snake[i + 3];
                        snake[i + 2] = snake[i - 4 + 2];
                        snake[i + 3] = snake[i - 4 + 3];
                    } else if (i > 4) {
                        let tempa = snake[i + 2];
                        let tempb = snake[i + 3];
                        snake[i + 2] = movea;
                        snake[i + 3] = moveb;
                        movea = tempa;
                        moveb = tempb;
                    }

                    ctx.fillRect(snake[i], snake[i + 1], 20, 20);
                }

                // Apple
                if (caught) {
                    ax = choicex[Math.floor(Math.random() * choicex.length)];
                    ay = choicex[Math.floor(Math.random() * choicex.length)];
                }

                caught = false;
                ctx.fillStyle = 'rgb(255,0,0)';
                ctx.fillRect(ax, ay, 20, 20);

                if (snake[0] === ax && snake[1] === ay) {
                    if (snake[snake.length - 4 + 2] === 0 && snake[snake.length - 4 + 3] === -20) {
                        snake.push(snake[snake.length - 4], snake[snake.length - 3] + 20, movea, moveb);
                    } else if (snake[snake.length - 4 + 2] === 0 && snake[snake.length - 4 + 3] === 20) {
                        snake.push(snake[snake.length - 4], snake[snake.length - 3] - 20, movea, moveb);
                    } else if (snake[snake.length - 4 + 2] === 20 && snake[snake.length - 4 + 3] === 0) {
                        snake.push(snake[snake.length - 4] - 20, snake[snake.length - 3], movea, moveb);
                    } else if (snake[snake.length - 4 + 2] === -20 && snake[snake.length - 4 + 3] === 0) {
                        snake.push(snake[snake.length - 4] + 20, snake[snake.length - 3], movea, moveb);
                    }
                    caught = true;
                }

                // Collision detection
                for (let h = 8; h < snake.length; h += 4) {
                    if (snake[0] === snake[h] && snake[1] === snake[h + 1]) {
                        lose = true;
                    }
                }

                if (snake[0] < 0 || snake[0] >= w || snake[1] < 0 || snake[1] >= h) {
                    lose = true;
                }
            }

            // Draw grid
            ctx.strokeStyle = 'rgb(0,0,0)';
            for (let j = 20; j < w; j += 20) {
                ctx.beginPath();
                ctx.moveTo(0, j);
                ctx.lineTo(w, j);
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(j, 0);
                ctx.lineTo(j, h);
                ctx.stroke();
            }

            // Start screen
            if (!start) {
                ctx.fillStyle = 'rgb(255,0,0)';
                ctx.font = '50px Arial';
                ctx.fillText('Press Enter to play', w / 6, h / 2);
            }

            // Game over screen
            if (lose) {
                ctx.fillStyle = 'rgb(37,89,0)';
                for (let g = 0; g < snake.length; g += 4) {
                    ctx.fillRect(snake[g], snake[g + 1], 20, 20);
                }
                ctx.fillStyle = 'rgb(255,0,0)';
                ctx.font = '50px Arial';
                ctx.fillText('GAME OVER', w / 4.5, h / 2);
                ctx.fillText('score: ' + (snake.length / 4 - 4), w / 3, h / 1.7);
            }
        }

        function keyPressed(event) {
            const keyCode = event.keyCode;

            if (keyCode === 68) {  // D
                if (snake[2] !== -20 && snake[3] !== 0) {
                    snake[2] = d[2];
                    snake[3] = d[3];
                }
            }

            if (keyCode === 65) {  // A
                if (snake[2] !== 20 && snake[3] !== 0) {
                    snake[2] = d[6];
                    snake[3] = d[7];
                }
            }

            if (keyCode === 83) {  // S
                if (snake[2] !== 0 && snake[3] !== -20) {
                    snake[2] = d[0];
                    snake[3] = d[1];
                }
            }

            if (keyCode === 87) {  // W
                if (snake[2] !== 0 && snake[3] !== 20) {
                    snake[2] = d[4];
                    snake[3] = d[5];
                }
            }

            if (keyCode === 13) {  // Enter
                start = true;
            }
        }

        document.addEventListener('keydown', keyPressed);
        gameLoop();
    </script>
</body>
</html>