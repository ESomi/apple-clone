(() => {

    let yOffset = 0; 
    let prevScrollHeight = 0; // 현재 스크롤 위치값(yOffset)보다 이전에 위치한 스크롤 섹션들의 스크롤 높이 값들의 합
    let currentScene = 0; //현재 활성화된 Scene(scrollSection)


    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-0'),
                messageA: document.querySelector('#scroll-section-0 .main-message.a'),
                messageB: document.querySelector('#scroll-section-0 .main-message.b'),
                messageC: document.querySelector('#scroll-section-0 .main-message.c'),
                messageD: document.querySelector('#scroll-section-0 .main-message.d'),
                canvas: document.querySelector('#video-canvas-0'),
                context: document.querySelector('#video-canvas-0').getContext('2d'),
                videoImages: []           
            },
            values: {                
                //이미지의 개수, 이미지 순서의 초기값과 최종값
                videoImageCount: 360,
                imageSequence: [0, 359], 
                canvas_opacity: [ 1, 0, {start: 0.9, end: 1 }],
                messageA_opacity_in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB_opacity_in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC_opacity_in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD_opacity_in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA_translateY_in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB_translateY_in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC_translateY_in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD_translateY_in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA_opacity_out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB_opacity_out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC_opacity_out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD_opacity_out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA_translateY_out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB_translateY_out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC_translateY_out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD_translateY_out: [0, -20, { start: 0.85, end: 0.9 }]
            }

        },
        {
            // 1
            type: 'normal',
            // heightNum: 5, // type normal에서는 필요 없음
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-1'),
                content: document.querySelector('#scroll-section-1 .description')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-2'),
                messageA: document.querySelector('#scroll-section-2 .a'),
                messageB: document.querySelector('#scroll-section-2 .b'),
                messageC: document.querySelector('#scroll-section-2 .c'),
                pinB: document.querySelector('#scroll-section-2 .b .pin'),
                pinC: document.querySelector('#scroll-section-2 .c .pin'),
                canvas: document.querySelector('#video-canvas-1'),
                context: document.querySelector('#video-canvas-1').getContext('2d'),
                videoImages: []           
            },
            values: {                
                videoImageCount: 360,
                imageSequence: [0, 359], 
                canvas_opacity_in: [0, 1, {start: 0, end: 0.1 }],
                canvas_opacity_out: [ 1, 0, {start: 0.95, end: 1 }],
                messageA_translateY_in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB_translateY_in: [30, 0, { start: 0.6, end: 0.65 }],
                messageC_translateY_in: [30, 0, { start: 0.87, end: 0.92 }],
                messageA_opacity_in: [0, 1, { start: 0.25, end: 0.3 }],
                messageB_opacity_in: [0, 1, { start: 0.6, end: 0.65 }],
                messageC_opacity_in: [0, 1, { start: 0.87, end: 0.92 }],
                messageA_translateY_out: [0, -20, { start: 0.4, end: 0.45 }],
                messageB_translateY_out: [0, -20, { start: 0.68, end: 0.73 }],
                messageC_translateY_out: [0, -20, { start: 0.95, end: 1 }],
                messageA_opacity_out: [1, 0, { start: 0.4, end: 0.45 }],
                messageB_opacity_out: [1, 0, { start: 0.68, end: 0.73 }],
                messageC_opacity_out: [1, 0, { start: 0.95, end: 1 }],
                pinB_scaleY: [0.5, 1, { start: 0.6, end: 0.65 }],
                pinC_scaleY: [0.5, 1, { start: 0.87, end: 0.92 }]
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll-section-3'),
                canvasCaption: document.querySelector('.canvas-caption'),
                canvas: document.querySelector('.image-blend-canvas'),
                context: document.querySelector('.image-blend-canvas').getContext('2d'),
                imagesPath: ['./images/blend-image-1.jpg','./images/blend-image-2.jpg',],
                images: []
                
            },
            values: {
                rect1X: [ 0, 0, { start: 0, end: 0} ],
                rect2X: [ 0, 0, { start: 0, end: 0} ],
                blendHeight: [ 0, 0, { start: 0, end: 0} ],
                rectStartY: 0,
                canvas_scale: [ 0, 0, { start: 0, end: 0 } ],
				canvasCaption_opacity: [ 0, 1, { start: 0, end: 0 } ],
				canvasCaption_translateY: [ 20, 0, { start: 0, end: 0 } ],
            }
        }
    ];

    function setCanvasImages() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image();            
            imgElem.src = `./video/video01/${1001 + i}.jpg`;
            // imgElem.src = `./video/snowing001/snowing_${701 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }
        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();            
            imgElem2.src = `./video/video02/${2001 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }



        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++){
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }

    }
     setCanvasImages();


 
    function setLayout() { //load, resize 시 동작
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
			if (sceneInfo[i].type === 'sticky') {
				sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight;
            } else if (sceneInfo[i].type === 'normal'){
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }
 
        // 현재 스크롤 위치에 맞춰서 currentScene을 자동으로 세팅
        yOffset = window.pageYOffset

        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight
            if (totalScrollHeight >= yOffset) {
                currentScene  = i;
                break;
            }
        }
        document.body.setAttribute('id', `show-scene-${currentScene}`)

        const heightRatio = window.innerHeight /1080;
        sceneInfo[0].objs.canvas.style.transform = `scale(${heightRatio})`
        sceneInfo[2].objs.canvas.style.transform = `scale(${heightRatio})`
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`
    }
    
    function calcValues(values, currentYOffset){
        let rv;
        // 현재 씬에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;
       
        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if (currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
                rv = (currentYOffset - partScrollStart) /  partScrollHeight  * (values[1] - values[0]) + values[0];
            } else if (currentYOffset < partScrollStart) {
                rv = values[0];
            } else if (currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }
        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas_opacity, currentYOffset);

                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD_opacity_out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD_translateY_out, currentYOffset)}%, 0)`;
                }
    
                break;
    
            case 2:
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);
                
                if (scrollRatio <= 0.5) {
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_in, currentYOffset);    
                } else {    
                    objs.canvas.style.opacity = calcValues(values.canvas_opacity_out, currentYOffset);          
                }
                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA_opacity_out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA_translateY_out, currentYOffset)}%, 0)`;
                }
    
                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_in, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageB.style.opacity = calcValues(values.messageB_opacity_out, currentYOffset);
                    objs.pinB.style.transform = `scaleY(${calcValues(values.pinB_scaleY, currentYOffset)})`;
                }
    
                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_in, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_in, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                } else {
                    // out
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC_translateY_out, currentYOffset)}%, 0)`;
                    objs.messageC.style.opacity = calcValues(values.messageC_opacity_out, currentYOffset);
                    objs.pinC.style.transform = `scaleY(${calcValues(values.pinC_scaleY, currentYOffset)})`;
                }
    
                break;
    
            case 3:
                console.log(innerHeight, innerWidth, document.body.offsetWidth)
                let step = 0;
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;
                if(widthRatio <= heightRatio){ 
                    canvasScaleRatio = heightRatio;
                } else {
                    canvasScaleRatio = widthRatio;                    
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.drawImage(objs.images[0], 0, 0, 1920, 1080);

				// 캔버스 사이즈에 맞춰 가정한 innerWidth와 innerHeight
                const recalculatedInnerWidth = document.body.offsetWidth / canvasScaleRatio;//스크롤바폭(16)제외 682 / 0.77
                const recalculatedInnerHeight =  window.innerHeight / canvasScaleRatio;

                //재생지점 y좌표
                if(!values.rectStartY) {
                    values.rectStartY = objs.canvas.offsetTop + 
                    (objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2;
                    // 673.5 = 549 + ( 1080 - (1080 * 0.77) ) / 2 )                     
                    values.rect1X[2].start = (window.innerHeight / 2) / scrollHeight; //0.10
                    values.rect2X[2].start = (window.innerHeight / 2) / scrollHeight;
                    values.rect1X[2].end = values.rectStartY / scrollHeight; //0.16
                    values.rect2X[2].end = values.rectStartY / scrollHeight;
                }                

                //재생지점 x좌표
                const whiteRectWidth = recalculatedInnerWidth * 0.15; //박스 폭 133  
                values.rect1X[0] = (objs.canvas.width - recalculatedInnerWidth) /2; 
                // 왼쪽시작점 517 = (1920 - 886) / 2
                values.rect1X[1] = values.rect1X[0] - whiteRectWidth; 
                // 왼쪽종료점 384 = 517 - 133
                values.rect2X[0] = values.rect1X[0] + recalculatedInnerWidth - whiteRectWidth;
                // 오른쪽시작점 1270 = 517 + 886 - 133
                values.rect2X[1] = values.rect2X[0] + whiteRectWidth; 
                // 오른쪽종료점 1403 = 1270 + 133
                objs.context.fillStyle = 'white';
                
                //fillRect(x, y, width, height)
                objs.context.fillRect(parseInt(calcValues(values.rect1X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);
                objs.context.fillRect(parseInt(calcValues(values.rect2X, currentYOffset)), 0, parseInt(whiteRectWidth), objs.canvas.height);    
                
                if (scrollRatio < values.rect1X[2].end) {
					step = 1;
					objs.canvas.classList.remove('sticky');
				} else {
                // 2번째 이미지 블렌딩
					step = 2;
                    // x좌표
                    values.blendHeight[0] = 0;
					values.blendHeight[1] = objs.canvas.height; //1080
                    // y좌표
					values.blendHeight[2].start = values.rect1X[2].end; //0.16
					values.blendHeight[2].end = values.blendHeight[2].start + 0.2; //0.18
					const blendHeight = calcValues(values.blendHeight, currentYOffset); 
                    //현재씬의 scrollHeight 0.16 ~ 0.18 구간 안에서 
                    //스크롤 함에 따라 0 ~ 1080px 범위 안에서 높이값이 점점 커짐

					objs.context.drawImage(objs.images[1],
						0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight,
						0, objs.canvas.height - blendHeight, objs.canvas.width, blendHeight
					);
                    //void ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

					let canvasScaleRatio = window.innerHeight / objs.canvas.height;

					objs.canvas.classList.add('sticky');
                    objs.canvas.style.top = `${-(objs.canvas.height - objs.canvas.height * canvasScaleRatio) / 2}px`;

                    if (scrollRatio > values.blendHeight[2].end) {
                        values.canvas_scale[0] = canvasScaleRatio; // 0.77
                        values.canvas_scale[1] = document.body.offsetWidth / (objs.canvas.width * 1.5); // 0.25
                        console.log(values.canvas_scale[0],values.canvas_scale[1]);
                        // document.body.offsetWidth / objs.canvas.width 709 / 1920 = 0.37
                        values.canvas_scale[2].start = values.blendHeight[2].end;
                        values.canvas_scale[2].end = values.canvas_scale[2].start + 0.2;

                        objs.canvas.style.transform = `scale(${calcValues(values.canvas_scale, currentYOffset)})`;
                        objs.canvas.style.marginTop = 0;                       
                    }

                    if (scrollRatio > values.canvas_scale[2].end 
                        && values.canvas_scale[2].end > 0) {
                        objs.canvas.classList.remove('sticky');
                        objs.canvas.style.marginTop = `${scrollHeight * 0.4}px`
                    }
                }

                

                break;

        }
    }

    function scrollLoop() { //scoll 시 동작
        //이 함수로 현재 몇 번째 섹션인지 판별함.
        enterNewScene = false;
        prevScrollHeight = 0;

        for (let i = 0; i < currentScene; i++) { //currentScene이 1일 때부터 동작함
            prevScrollHeight += sceneInfo[i].scrollHeight;//currentScne이 1,2,3일 때 각각 3330,6660,9990
        }

        if(yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) { // 씬1을 모두 스크롤 하는 순간(=yOffset이 3330 + 3330 = 6660보다 커지는 순간)
        //currentScene이 증가함.
            enterNewScene = true;
            currentScene++; 
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }
        
        if(yOffset < prevScrollHeight) { // 현재 씬이 이전 씬으로 넘어가는 순간 currentScene이 감소함.
            if (currentScene === 0) return; // 바운스효과 시 오류방지
            currentScene--; 
            enterNewScene = true;
            document.body.setAttribute('id', `show-scene-${currentScene}`)
        }

        if (enterNewScene) return;

        playAnimation();
    }
    
    window.addEventListener('scroll', () => {
        yOffset = Math.ceil(window.pageYOffset)
        scrollLoop();
        // console.log(sceneInfo[0].scrollHeight)
    });

    window.addEventListener('load', () => {		
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });
    
    window.addEventListener('resize', setLayout);

})();