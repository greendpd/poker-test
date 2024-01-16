g_cardScale=2000;

deck1=createDeck();
deck2=createDeck();

deck1.shuffle();
deck2.shuffle();



cardArr=[];
for(x=0; x<5; x++){
    cardArr.push(deck1.draw());

}

for(x=0; x<cardArr.length; x++){
    addHere=document.getElementById("hand");
    addHere.appendChild(makeCardDiv(cardArr[x].rawValue));
}


// highCardArr=[];
// highCardArr.push(makeCard(1),makeCard(13),makeCard(3),makeCard(30),makeCard(44),makeCard(21));
// resultsArray.push(getResults(highCardArr));


// console.log(compareResults(resultsArray));






// runTimes=10;

// handTotals={};
// handTotals["straightFlush"]=0;
// handTotals["four"]=0;
// handTotals["fullHouse"]=0;
// handTotals["flush"]=0;
// handTotals["straight"]=0;
// handTotals["three"]=0;
// handTotals["twoPair"]=0;
// handTotals["pair"]=0;
// handTotals["highCard"]=0;

// for(aa=0; aa<runTimes; aa++){
//     theCurrentDeck=createDeck();
//     theCurrentDeck.shuffle();


    
//     dealt=makeHand(7,theCurrentDeck);

//     currRes=getResults(dealt);


//     for(handType in currRes){
//         if(handType!="cards"){
//             if(currRes[handType]!=null)
//             handTotals[handType]++;
//         }
//     }
// }

// console.log(handTotals);




gamesPlayed=1000;

players=10;


splitCount=0;

winTypes={};

winningHandArray=[];
for(x=0; x<13; x++){
    addMe=[];
    for(y=0; y<13; y++){
        toAdd={};
        toAdd.suited=0;
        toAdd.suitedCount=0;
        toAdd.notSuited=0;
        toAdd.notSuitedCount=0;
        addMe.push(toAdd);
    }
    winningHandArray.push(addMe);
}

for(bb=0; bb<gamesPlayed; bb++){
    myDeck=createDeck();
    myDeck.shuffle();
    communityCards=makeHand(5,myDeck);

    
    resultArray=[];
    playerHand=[];
    
    for(playGameCounter=0; playGameCounter<players; playGameCounter++){
        playerCards=makeHand(2,myDeck);
        theHandSumm=handSummary(playerCards)
        playerHand.push(theHandSumm);
        if(theHandSumm.suited){
            winningHandArray[theHandSumm.high][theHandSumm.low].suitedCount++;
        }else{
            winningHandArray[theHandSumm.high][theHandSumm.low].notSuitedCount++;
        }


        for(playGameCounterA=0; playGameCounterA<communityCards.length; playGameCounterA++){
            playerCards.push(communityCards[playGameCounterA]);
        }
        resultArray.push(getResults(playerCards,playGameCounter));
    }
    winners=compareResults(resultArray);
    
    for(winHand in winners[0]){
        if(winners[0][winHand]!=undefined){
            if(winTypes[winHand]==undefined){
                winTypes[winHand]=0;
            }
            winTypes[winHand]++;
        }
    }

    winningHand=playerHand[winners[0].player];
    
    if(winningHand.suited){
        winningHandArray[winningHand.high][winningHand.low].suited++;
    }else{
        winningHandArray[winningHand.high][winningHand.low].notSuited++;
    }
}


console.log(winningHandArray);

//Array of objects:
//.high
//.low
//.suited
//.winPercentage

handsAndPercents=[];
for(x=0; x<winningHandArray.length; x++){
    
    
    for(y=0; y<winningHandArray[x].length; y++){
        if(winningHandArray[x][y].suitedCount>0){
            addSuited={};
            addSuited.high=x;
            addSuited.low=y;
            addSuited.suited=true;
            addSuited.winPercent=winningHandArray[x][y].suited/winningHandArray[x][y].suitedCount;
            addSuited.frequency=winningHandArray[x][y].suitedCount/(gamesPlayed*players) ;
            handsAndPercents.push(addSuited);
        }
        if(winningHandArray[x][y].notSuitedCount>0){
            addUnsuited={};
            addUnsuited.high=x;
            addUnsuited.low=y;
            addUnsuited.suited=false;
            addUnsuited.winPercent=winningHandArray[x][y].notSuited/winningHandArray[x][y].notSuitedCount;
            addUnsuited.frequency=winningHandArray[x][y].notSuitedCount/(gamesPlayed*players) ;
            handsAndPercents.push(addUnsuited);
        }
    }
}

//Sort by win percent:
handsAndPercents.sort((a,b)=>{
    return a.winPercent-b.winPercent;
});
console.log(handsAndPercents);
makeTable(handsAndPercents);

function makeTable(handsWithPercents){
    table=document.createElement("table");
    tableHead=document.createElement("tr");
    firstHeading=document.createElement("th")
    firstHeading.textContent="Hand";
    secondHeading=document.createElement("th");
    secondHeading.textContent="Win Percent"
    thirdHeading=document.createElement("th");
    thirdHeading.textContent="Frequency";
    fourthHeading=document.createElement("th");
    fourthHeading.textContent="Cumulative Frequency";

    tableHead.appendChild(firstHeading);
    tableHead.appendChild(secondHeading);
    tableHead.appendChild(thirdHeading);
    
    table.appendChild(tableHead);


    cumFreq=0;

    for(x=handsWithPercents.length-1; x>=0; x--){
        highCard=cardValToString(handsWithPercents[x].high)
        lowCard=cardValToString(handsWithPercents[x].low)
        
        hand=highCard+" " + lowCard;

        if(handsWithPercents[x].suited){
            hand+=" suited";
        }

        row=document.createElement("tr");

        handData=document.createElement("td");
        handData.textContent=hand;

        winPercentData=document.createElement("td");
        winPercentData.textContent=handsWithPercents[x].winPercent;

        freqData=document.createElement("td");
        freqData.textContent=handsWithPercents[x].frequency;

        cumFreq+=handsWithPercents[x].frequency;

        cumFreqData=document.createElement("td");
        cumFreqData.textContent=cumFreq;
        
        row.appendChild(handData);
        row.appendChild(winPercentData);
        row.appendChild(freqData);
        row.appendChild(cumFreqData);
        table.appendChild(row);
    }

    
    document.getElementById("table").appendChild(table);

}

// console.log(winTypes.straightFlush);
// console.log(winTypes.four);
// console.log(winTypes.fullHouse);
// console.log(winTypes.flush);
// console.log(winTypes.straight);
// console.log(winTypes.three);
// console.log(winTypes.twoPair);
// console.log(winTypes.pair);
// console.log(winTypes.highCard);



function handSummary(twoCardArray){
    toRet={};

    firstCard=(twoCardArray[0].numValue+13)%15
    secondCard=(twoCardArray[1].numValue+13)%15

    if(firstCard>=secondCard){
        toRet.high=twoCardArray[0].numValue;
        toRet.low=twoCardArray[1].numValue;
    }else{
        toRet.high=twoCardArray[1].numValue;
        toRet.low=twoCardArray[0].numValue;
    }

    toRet.suited=twoCardArray[0].suit==twoCardArray[1].suit;
    return toRet;
}

function cardValToString(cardVal){
    if(cardVal==1){
        return "A";
    }
    if(cardVal==0){
        return "K";
    }
    if(cardVal==12){
        return "Q";
    }
    if(cardVal==11){
        return "J";
    }
    return cardVal;
}



function makeHand(handSize,theDeck){
    objectToReturn=[];
    for(xx=0; xx<handSize; xx++){
        objectToReturn.push(theDeck.draw());
    }

    return objectToReturn;
}


function makeCardDiv(cardNumber){
    initWidthOffset=g_cardScale/125;
    cardWidth=g_cardScale/14.599;
    widthShift=g_cardScale/13.0933;

    initHeightOffset=g_cardScale/7.0922;
    cardHeight=g_cardScale/9.590;
    heightShift=g_cardScale/9.091;

    numberShift=(12+cardNumber)%13;
    suitShift=Math.floor(cardNumber/13);

    totalWidthShift=initWidthOffset+numberShift*widthShift;
    totalHeightShift=initHeightOffset+suitShift*heightShift;
    
    newCard=document.createElement("div");
    newCard.setAttribute("style",`height:${cardHeight}px;width:${cardWidth}px; background:url('img/deck.jpg') -${totalWidthShift}px -${totalHeightShift}px;background-size:${g_cardScale}px auto;`);

    return newCard;
}

function createDeck(){
    toRet={};
    toRet.cards=[];
    for(x=0; x<52; x++){
        toRet.cards.push(x);
    }


    toRet.shuffle= function() {
        temp=[];
        
        while(this.cards.length>0){
            temp.push(this.cards.splice(Math.floor(Math.random()*this.cards.length),1)[0]);
        }
        this.cards=temp;
    }

    toRet.showDeck=function(){
        return this.cards;
    }

    toRet.draw=function(){
        if(this.cards.length==0){
            return null;
        }
        toRet={};
        toRet.rawValue=this.cards[0];
        toRet.numValue=this.cards[0]%13;
        toRet.suit=Math.floor(this.cards[0]/13);
        this.cards.splice(0,1);
        return toRet;
    }


    return toRet;
}

function makeCard(rawVal){
    toRet={};
    toRet.rawValue=rawVal;
    toRet.numValue=rawVal%13;
    toRet.suit=Math.floor(rawVal/13);
    return toRet;
}

function createResult(cardArray, thePlayer){
    toRet={};
    toRet.cards={};
    toRet.cards.byNumber=[];
    toRet.cards.bySuit=[];

    for(x=0; x<13; x++){
        toRet.cards.byNumber.push([]);
    }

    for(x=0; x<cardArray.length; x++){
        toRet.cards.byNumber[cardArray[x].numValue].push(cardArray[x]);
    }
    
    for(x=0; x<4; x++){
        toRet.cards.bySuit.push([]);
    }

    for(x=14; x>=2; x--){
        currentCard=x%13;
        for(y=0; y<toRet.cards.byNumber[currentCard].length;y++){
            toRet.cards.bySuit[toRet.cards.byNumber[currentCard][y].suit].push(toRet.cards.byNumber[currentCard][y]);
        }
    }

    toRet.player=thePlayer;

    toRet.straightFlush=null;
    toRet.four=null;
    toRet.fullHouse=null;
    toRet.flush=null;
    toRet.straight=null;
    toRet.three=null;
    toRet.twoPair=null;
    toRet.pair=null;
    toRet.highCard=null;
    return toRet;
}

//Take in an array of results
//Returns an array of winners results (if two hands match, they split)
function compareResults(toCompare){
    currentTop=[];
    for(cRa=0; cRa<toCompare.length; cRa++){
        if(toCompare[cRa].straightFlush!=null){
            currentTop.push(toCompare[cRa]);
        }
    }

    if(currentTop.length>1){
        bestStraightEndIndex=0;
        topCard=(currentTop[0].straightFlush[0].numValue+13)%15;
        for(cRb=1; cRb<currentTop.length; cRb++){
            currCardValue=(currentTop[cRb].straightFlush[0].numValue+13)%15;
            if(currCardValue>topCard){
                topCard=currCardValue;
                bestStraightEndIndex=cRb;
            }
        }

        currIndex=0;
        while(currIndex<currentTop.length){
            currentValue=(currentTop[currIndex].straightFlush[0].numValue+13)%15;
            if(currentValue!=topCard){
                currentTop.splice(currIndex,1);
            }else{
                currIndex++;
            }
        }

    }

    if(currentTop.length>0){
        return currentTop;
    }

    //Compare 4 of a kinds...
    for(cRa=0; cRa<toCompare.length; cRa++){
        if(toCompare[cRa].four!=null){
            currentTop.push(toCompare[cRa]);
        }
    }

    if(currentTop.length>1){
        bestSet=(currentTop[0].four[0].numValue+13)%15;
        bestKicker=(currentTop[0].four[4].numValue+13)%15;

        for(cRb=1; cRb<currentTop.length; cRb++){
            currSet=(currentTop[cRb].four[0].numValue+13)%15;
            currKicker=(currentTop[cRb].four[4].numValue+13)%15;

            if(currSet>bestSet){
                bestSet=currSet;
                bestKicker=currKicker;
            }else if(currSet==bestSet &&currKicker>bestKicker){
                bestKicker=currKicker;
            }
        }

        currIndex=0;
        while(currIndex<currentTop.length){
            currSet=(currentTop[currIndex].four[0].numValue+13)%15;
            currKicker=(currentTop[currIndex].four[4].numValue+13)%15;
            if(currSet!=bestSet ||currKicker!=bestKicker){
                currentTop.splice(currIndex,1);
            }else{
                currIndex++;
            }
        }
    }

    if(currentTop.length>0){
        return currentTop;
    }


    for(cRc=0; cRc<toCompare.length; cRc++){
        if(toCompare[cRc].fullHouse!=null){
            currentTop.push(toCompare[cRc]);
        }
    }

    if(currentTop.length>1){
        bestThree=(currentTop[0].fullHouse[0].numValue+13)%15;
        bestTwo=(currentTop[0].fullHouse[3].numValue+13)%15;

        for(cRd=1; cRd<currentTop.length; cRd++){
            currThree=(currentTop[cRd].fullHouse[0].numValue+13)%15;
            currTwo=(currentTop[cRd].fullHouse[3].numValue+13)%15
            if(currThree>bestThree){
                bestThree=currThree;
                bestTwo=currTwo;
            }else if(currThree==bestThree && currTwo>bestTwo){
                bestTwo=currTwo;
            }
        }

        currIndex=0;
        while(currIndex<currentTop.length){
            currThree=(currentTop[currIndex].fullHouse[0].numValue+13)%15;
            currTwo=(currentTop[currIndex].fullHouse[3].numValue+13)%15;
            if(currThree!=bestThree || currTwo !=bestTwo){
                currentTop.splice(currIndex,1);
            }else{
                currIndex++;
            }
        }
    }

    if(currentTop.length>0){
        return currentTop;
    }


    for(cRe=0; cRe<toCompare.length; cRe++){
        if(toCompare[cRe].flush!=null){
            currentTop.push(toCompare[cRe]);
        }
    }

    if(currentTop.length>1){
        bestFlush=[];
        for(cRf=0; cRf<currentTop[0].flush.length && cRf<5;cRf++ ){
            bestFlush.push((currentTop[0].flush[cRf].numValue+13)%15);
        }

        for(cRg=1; cRg<currentTop.length; cRg++){
            beatHigh=false;
            lostToHigh=false;
            for(cRh=0; cRh<currentTop[cRg].flush.length && cRh<5 && !lostToHigh; cRh++){
                currValue=(currentTop[cRg].flush[cRh].numValue+13)%15;
                if(currValue>bestFlush[cRh] || beatHigh){
                    bestFlush[cRh]=currValue;
                    beatHigh=true;
                }else if(currValue<bestFlush[cRh]){
                    lostToHigh=true;
                }
            }
        }

        currIndex=0;
        while(currIndex<currentTop.length){
            lost=false;
            for(cRi=0; cRi<currentTop[currIndex].flush.length && cRi<5 && !lost; cRi++){
                currentVal=(currentTop[currIndex].flush[cRi].numValue+13)%15;
                if(currentVal!=bestFlush[cRi]){
                    lost=true;
                }
            }

            if(lost){
                currentTop.splice(currIndex,1);
            }else {
                 currIndex++;
            }
        }
    }

    if(currentTop.length>0){
        return currentTop;
    }


    for(cRj=0; cRj<toCompare.length; cRj++){
        if(toCompare[cRj].straight!=null){
            currentTop.push(toCompare[cRj]);
        }
    }

    if(currentTop.length>1){
        topCard=(currentTop[0].straight[0].numValue+13)%15;
        for(cRk=1; cRk<currentTop.length; cRk++){
            currHigh=(currentTop[cRk].straight[0].numValue+13)%15;
            if(currHigh>topCard){
                topCard=currHigh;
            }
        }

        currIndex=0;
        while(currIndex<currentTop.length){
            currHigh=(currentTop[currIndex].straight[0].numValue+13)%15;
            if(currHigh!=topCard){
                currentTop.splice(currIndex,1);
            }else{
                currIndex++;
            }
        }
    }

    if(currentTop.length>0){
        return currentTop;
    }


    for(cRm=0; cRm<toCompare.length; cRm++){
        if(toCompare[cRm].three!=null){
            currentTop.push(toCompare[cRm]);
        }
    }

    if(currentTop.length>1){
        arrayToCheck=[];
        for(cRn=0; cRn<currentTop.length; cRn++){
            arrayToCheck.push(currentTop[cRn].three);
        }
        winIndices=handRankCompare(arrayToCheck);
        winners=[];
        for(cRp=0; cRp<winIndices.length; cRp++){
            winners.push(currentTop[winIndices[cRp]]);
        }
        return winners;

    }

    if(currentTop.length>0){
        return currentTop;
    }

    
    for(cRm=0; cRm<toCompare.length; cRm++){
        if(toCompare[cRm].twoPair!=null){
            currentTop.push(toCompare[cRm]);
        }
    }

    if(currentTop.length>1){
        arrayToCheck=[];
        for(cRn=0; cRn<currentTop.length; cRn++){
            arrayToCheck.push(currentTop[cRn].twoPair);
        }
        winIndices=handRankCompare(arrayToCheck);
        winners=[];
        for(cRp=0; cRp<winIndices.length; cRp++){
            winners.push(currentTop[winIndices[cRp]]);
        }
        return winners;

    }

    if(currentTop.length>0){
        return currentTop;
    }


    for(cRm=0; cRm<toCompare.length; cRm++){
        if(toCompare[cRm].pair!=null){
            currentTop.push(toCompare[cRm]);
        }
    }

    if(currentTop.length>1){
        arrayToCheck=[];
        for(cRn=0; cRn<currentTop.length; cRn++){
            arrayToCheck.push(currentTop[cRn].pair);
        }
        winIndices=handRankCompare(arrayToCheck);
        winners=[];
        for(cRp=0; cRp<winIndices.length; cRp++){
            winners.push(currentTop[winIndices[cRp]]);
        }
        return winners;

    }

    if(currentTop.length>0){
        return currentTop;
    }


    for(cRm=0; cRm<toCompare.length; cRm++){
        if(toCompare[cRm].highCard!=null){
            currentTop.push(toCompare[cRm]);
        }
    }

    if(currentTop.length>1){
        arrayToCheck=[];
        for(cRn=0; cRn<currentTop.length; cRn++){
            arrayToCheck.push(currentTop[cRn].highCard);
        }
        winIndices=handRankCompare(arrayToCheck);
        winners=[];
        for(cRp=0; cRp<winIndices.length; cRp++){
            winners.push(currentTop[winIndices[cRp]]);
        }
        return winners;

    }

    if(currentTop.length>0){
        return currentTop;
    }

}

function handRankCompare(theResults){
    best=[];
    bestIndex=[];
    
    for(hRCa=0; hRCa<theResults[0].length && hRCa<5; hRCa++){
        toPush=(theResults[0][hRCa].numValue+13)%15;
        best.push(toPush);
    }

    for(hRCb=1; hRCb<theResults.length; hRCb++){
        lost=false;
        beatHigh=false;
        for(hRCc=0; hRCc<best.length && !lost; hRCc++){
            currVal=(theResults[hRCb][hRCc].numValue+13)%15;
            if(currVal>best[hRCc] || beatHigh){
                best[hRCc]=currVal;
                beatHigh=true;
            }else if(best[hRCc]>currVal){
                lost=true;
            }
        }
    }
    
    for(hRCd=0; hRCd<theResults.length; hRCd++){
        lost=false;
        for(hRCe=0; hRCe<theResults[hRCd].length && !lost; hRCe++){
            valToTest=(theResults[hRCd][hRCe].numValue+13)%15;
            if(valToTest!=best[hRCe]){
                lost=true;
            }
        }
        if(!lost){
            bestIndex.push(hRCd);
        }
    }

    return bestIndex;

}

//Take in an array of results
function compareStraights(compArray){
    winnerArray=[];

    winningIndex=0;
    highCard=compArray[0].numValue;
    for(cSa=1; cSa<compArray.length; cSa++){
        compareResult=compareCardValue(highCard,compArray[cSa].numValue);
        if(compareResult<0){
            highCard=compArray[cSa].numValue;
            winningIndex=cSa;
        }
    }

    for(cSb=winningIndex; cSb<compArray.length; cSb++){
        if(highCard==compArray[cSb].numValue){
            winnerArray.push(compArray[cSb])
        }   //The issue with this is it returns the winning array, NOT the winning player...
    }

}

//Returns 0 if same, positive if first is higher, negative if second is higher
function compareCardValue(first,second){
    first=(first+13)%15;
    second=(second+13)%15;
    return first-second;
}

function getResults(cardSet,player){
    theResult=createResult(cardSet,player);
    // console.log(theResult)
    if(checkStraightAndFlush(theResult)){
        return theResult;
    }
    
    if(checkFourOfAKind(theResult)){
        return theResult;
    }

    if(checkFullHouse(theResult)){
        return theResult;
    }

    if(checkFlush(theResult)){
        return theResult;
    }

    if(straightCheck(theResult)){
        return theResult;
    }

    if(checkThreeOfAKind(theResult)){
        return theResult;
    }

    if(checkTwoPair(theResult)){
        return theResult;
    }

    if(checkPair(theResult)){
        return theResult;
    }

    if(getHighCard(theResult)){
        return theResult;
    }



    return theResult;

}

function getHighCard(currentResult){
    currentResult.highCard=[];
    for(y=14; y>=2 && currentResult.highCard.length<5; y--){
        currentCard=y%13;
        for(z=0; z<currentResult.cards.byNumber[currentCard].length && currentResult.highCard.length<5; z++){
            currentResult.highCard.push(currentResult.cards.byNumber[currentCard][z]);
        }
    }
    return true;
}

function checkPair(currentResult){
    pairLocation=-1;
    for(v=14; v>=2 && pairLocation==-1; v--){
        currentCard=v%13;
        if(currentResult.cards.byNumber[currentCard].length>=2){
            pairLocation=currentCard;
        }
    }

    if(pairLocation==-1){
        return false;
    }

    currentResult.pair=[];
    currentResult.pair.push(currentResult.cards.byNumber[pairLocation][0]);
    currentResult.pair.push(currentResult.cards.byNumber[pairLocation][1]);

    for(w=14; w>=2 && currentResult.pair.length<5; w--){
        currentCard=w%13;
        if(currentCard!=pairLocation){
            for(x=0; x<currentResult.cards.byNumber[currentCard].length; x++){    //Shouldn't be necessary to check for multiples in any number other than the pair, since two pair should have caught it. However, we live in a fallen world...
                currentResult.pair.push(currentResult.cards.byNumber[currentCard][x]);
            }
        }
    }
    
    return true;
}

function checkTwoPair(currentResult){
    topPair=-1;
    for(s=14; s>=2 && topPair==-1; s--){
        currentCard=s%13;
        if(currentResult.cards.byNumber[currentCard].length>=2){
            topPair=currentCard;
        }
    }

    if(topPair==-1){
        return false;
    }

    bottomPair=-1;
    
    // +12%13

    //  1:start at 13
    //  0:start at 12
    //  12: start at 11
    //  11: start at 10
    //  ...
    //  3: start at 2

    startSearch=(topPair+12)%13;
    if(startSearch==0){
        startSearch=13;
    }

    for(t=startSearch; t>=2 && bottomPair==-1; t--){
        currentCard=t%13;
        if(currentResult.cards.byNumber[currentCard].length>=2){
            bottomPair=currentCard;
        }
    }

    if(bottomPair==-1){
        return false;
    }

    currentResult.twoPair=[];
    currentResult.twoPair.push(currentResult.cards.byNumber[topPair][0]);
    currentResult.twoPair.push(currentResult.cards.byNumber[topPair][1]);
    
    currentResult.twoPair.push(currentResult.cards.byNumber[bottomPair][0]);
    currentResult.twoPair.push(currentResult.cards.byNumber[bottomPair][1]);

    for(u=14; u>=2; u--){
        currentCard=u%13;
        if(currentCard!=topPair &&currentCard!=bottomPair){
            if(currentResult.cards.byNumber[currentCard].length>0){
                currentResult.twoPair.push(currentResult.cards.byNumber[currentCard][0]);
            }
        }
        if(currentResult.twoPair.length>=5){
            return true;
        }
    }

    return true;

}

function checkThreeOfAKind(currentResult){
    for(p=14; p>=2; p--){
        currentCard=p%13;
        if(currentResult.cards.byNumber[currentCard].length>=3){
            currentResult.three=[];
            for(q=0; q<3; q++){
                currentResult.three.push(currentResult.cards.byNumber[currentCard][q]);
            }
            for(r=14; r>=2 && currentResult.three.length<5; r--){
                immediateCard=r%13;
                if(immediateCard==currentCard){ //This shouldn't happen--this would be a four of a kind, but it should handle this gracefully anyway
                    for(s=3; s<currentResult.cards.byNumber[currentCard].length && currentResult.three.length<5; s++){
                        currentResult.three.push(currentResult.cards.byNumber[currentCard][s]);
                    }
                }else { //Shouldn't need the loop, because if there are multiples in another, then it would be a full house, still it will handle that situation gracefully
                    for(t=0; t<currentResult.cards.byNumber[immediateCard].length && currentResult.three.length<5; t++){
                        currentResult.three.push(currentResult.cards.byNumber[immediateCard][t]);
                    }
                }
            }
            return true;
        }
    }
    return false;
}

function straightCheck(currentResults){
    
    for(k=14; k>=5; k--){
        liveStraight=true;
        for(m=0; m<5 && liveStraight ; m++){
            currentCard=(k-m)%13;
            if(currentResults.cards.byNumber[currentCard].length==0){
                liveStraight=false;
            }
        }
        if(liveStraight){
            currentResults.straight=[];
            for(n=0; n<5; n++){
                currCard=(k-n)%13;
                currentResults.straight.push(currentResults.cards.byNumber[currCard][0]);
            }
            return true;
        }
    }
    return false;
}

function checkFourOfAKind(currentResult){
    for(c=12; c>=0; c--){
        currentCard=(c+2)%13;
        if(currentResult.cards.byNumber[currentCard].length>=4){
            currentResult.four=[];
            for(e=0; e<4; e++){
                currentResult.four.push(currentResult.cards.byNumber[currentCard][e])
            }
            for(d=12; d>=0; d--){
                highCard=(d+2)%13;
                if(highCard==currentCard && currentResult.cards.byNumber[highCard].length>4){
                    currentResult.four.push(currentResult.cards.byNumber[highCard][4]);
                    return true;
                }else if(currentResult.cards.byNumber[highCard].length>0){
                    currentResult.four.push(currentResult.cards.byNumber[highCard][0]);
                    return true;
                }

            }
            return true;
        }
    }

    return false;
}

function checkStraightAndFlush(currentResult){
    storedResult=null;
    for(xx=0; xx<currentResult.cards.bySuit.length; xx++){
        temp=[];
        for(y=0; y<13; y++){
            temp.push([]);
        }
        for(y=0; y<currentResult.cards.bySuit[xx].length; y++){
            temp[currentResult.cards.bySuit[xx][y].numValue].push(currentResult.cards.bySuit[xx][y]);
        }

        straightResult=checkStraight(temp);
        if(straightResult!=null){
            if(storedResult == null){
                storedResult=straightResult;
            }else{
                straightResultNumVal=(straightResult[0].numValue+11)%13;
                prevResultNumVal=(storedResult[0].numValue+11)%13;
                if(straightResultNumVal>prevResultNumVal){
                    storedResult=straightResult;
                }
            }
        }

    }

    currentResult.straightFlush=storedResult;
    return storedResult!=null;

    
  

}

function checkStraight(cardArr){
    toRet=[];
    for(x=14; x>4; x--){
        straight=true;
        for(y=0; y<5 && straight; y++){
            if(cardArr[(x-y)%13].length==0){
                straight=false;
            }
        }
        if(straight){
            for(y=0; y<5; y++){
                toRet.push(cardArr[(x-y)%13][0]);
            }
            return toRet;
        }
    }
    return null;
}

function checkFlush(currentResult){
    highCard=-1;
    highSuit=-1;
    for(i=0; i<currentResult.cards.bySuit.length; i++){
        if(currentResult.cards.bySuit[i].length>=5){
            highInSuit=(currentResult.cards.bySuit[i][0].numValue+11)%13;
            if(highInSuit>highCard){
                highCard=highInSuit;
                highSuit=i;
            }
        }
    }

    if(highSuit==-1){
        return false;
    }
    currentResult.flush=[];
    for(j=0; j<5; j++){
        currentResult.flush.push(currentResult.cards.bySuit[highSuit][j]);
    }

    return true;

}

function checkFullHouse(currentResult){
    hasThree=-1;
    for(f=14; f>=2 && hasThree==-1; f--){
        currentCard=f%13;
        if(currentResult.cards.byNumber[currentCard].length>=3){
            hasThree=currentCard;
        }
    }
    if(hasThree==-1){
        return false; 
    }

    hasTwo=-1;

    for(g=14; g>=2 && hasTwo==-1; g--){
        currentCard=g%13;
        if(currentCard!=hasThree && currentResult.cards.byNumber[currentCard].length>=2){
            hasTwo=currentCard;
        }
    }
    
    if(hasTwo==-1){
        return false;
    }

    currentResult.fullHouse=[];
    for(h=0; h<3; h++){
        currentResult.fullHouse.push(currentResult.cards.byNumber[hasThree][h]);
    }

    for(i=0; i<2; i++){
        currentResult.fullHouse.push(currentResult.cards.byNumber[hasTwo][i]);
    }
    return true;
}
