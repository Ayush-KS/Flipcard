var selected = 0;
var selectedAddresses = new Array();
let cards = $('#deck img');

$(cards).click(function() {
    var currAddress = $(this).attr('src');
    if($(this).css('opacity') == 1) {
        selectedAddresses.push(currAddress);
        $(this).css('opacity', '0.3');
    } else {
        selectedAddresses.splice(selectedAddresses.indexOf(currAddress), 1);
        $(this).css('opacity', '1');
    }
    
    if(selectedAddresses.length == 5) {
        cardSelect();
    }
});

var selectedCards;
var finalCard;
var selectedSuits = new Array();
var selectedRanks = new Array();

let cardSelect = function() {

    $('body').css('background-image', 'linear-gradient(to right, #4FACFE, #00F2FE)')
    $('#heading').text("Now select one final card!");
    $('#deck').css('display', 'none');
    $('#selected-cards').css('display', 'flex');

    var i = 0;
    for(address of selectedAddresses) {

        selectedSuits[i] = address[address.length - 5];
        var curr = address[address.length - 6];

        if(curr == 'A') {
            selectedRanks[i++] = 1;
        } else if(curr == '0') {
            selectedRanks[i++] = 10;
        } else if(curr == 'J') {
            selectedRanks[i++] = 11;
        } else if(curr == 'Q') {
            selectedRanks[i++] = 12;
        } else if(curr == 'K') {
            selectedRanks[i++] = 13;
        } else {
            selectedRanks[i++] = parseInt(curr);
        }

        $('#selected-cards').prepend($('<img>',{src: address}));
    }

    selectedCards = $('#selected-cards img');

    $(selectedCards).click(function() {
        finalCard = $(this).attr('src');
        finalShow();
    });
}

var priority = function(suit) {
    switch(suit) {
        case 'H': return 0;
        case 'D': return 1;
        case 'S': return 2;
        default: return 3;
    }
}

var swap = function(arr, i, j) {
    var temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
    return;
}

let finalShow = function() {

    $('.button').css('display', 'block');

    $('body').css('background-image', 'linear-gradient(to left, #B06AB3, #4568DC)')
    $('#heading').text("Now show this to me!");
    $('#selected-cards > img').remove();
    var finalCardSuit = finalCard[finalCard.length - 5];
    var finalCardRank = finalCard[finalCard.length - 6];
    
    switch(finalCardRank) {
        case '0': {
            finalCardRank = 10;
            break;
        }

        case 'A': {
            finalCardRank = 1;
            break;
        }

        case 'J': {
            finalCardRank = 11;
            break;
        }

        case 'Q': {
            finalCardRank = 12;
            break;
        }

        case 'K': {
            finalCardRank = 13;
            break;
        }

        default : {
            finalCardRank = parseInt(finalCardRank);
            break;
        }
    }

    var pos = (finalCardRank - 1) % 5;

//    console.log(pos, finalCardRank);


    // console.log(selectedRanks);

    let maxCardIndex = -1;
    for(let i = 0; i < 5; i++) {
        if(selectedRanks[i] == finalCardRank && selectedSuits[i] == finalCardSuit)
            continue;
        if(maxCardIndex == -1) {
            maxCardIndex = i;
            continue;
        }
        if(selectedRanks[i] > selectedRanks[maxCardIndex])
            maxCardIndex = i;
        else if(selectedRanks[i] == selectedRanks[maxCardIndex]) {
            if(priority(selectedSuits[i]) > priority(selectedSuits[maxCardIndex]))
                maxCardIndex = i;
        }
    }

    var finalCardPos = priority(finalCardSuit);

//    console.log(pos, finalCardPos)
    

//    console.log(maxCardIndex, selectedSuits[maxCardIndex], selectedRanks[maxCardIndex]);

    // console.log(selectedAddresses);
    // console.log(selectedRanks);
    // console.log(selectedSuits);
    var maxCardAddress = selectedAddresses[maxCardIndex];

    selectedSuits.splice(maxCardIndex, 1);
    selectedRanks.splice(maxCardIndex, 1);
    selectedAddresses.splice(maxCardIndex, 1);

    // console.log(selectedAddresses);
    // console.log(selectedRanks);
    // console.log(selectedSuits);

    var finalCardIndex = selectedAddresses.indexOf(finalCard);
    selectedSuits.splice(finalCardIndex, 1);
    selectedRanks.splice(finalCardIndex, 1);
    selectedAddresses.splice(finalCardIndex, 1);

    
    // console.log(selectedAddresses);
    // console.log(selectedRanks);
    // console.log(selectedSuits);
    

    for(let k = 0; k < 2; k++) {
        for(let j = 0; j < 3 - k; j++) {
            if(selectedRanks[j] > selectedRanks[j + 1]) {
//                console.log(selectedRanks[j], selectedSuits[j], selectedAddresses[j]);
                swap(selectedRanks, j, j + 1);
                swap(selectedSuits, j, j + 1);
                swap(selectedAddresses, j, j + 1);
            } else if(selectedRanks[j] == selectedRanks[j + 1]) {
                if(priority(selectedSuits[j]) < selectedSuits[j + 1]) {
                    swap(selectedRanks, j, j + 1);
                    swap(selectedSuits, j, j + 1);
                    swap(selectedAddresses, j, j + 1);
                }
            }
        }
    }

    console.log(selectedAddresses);
    console.log(selectedRanks);
    console.log(selectedSuits);

    var val, t1, t2, t3;
    if(finalCardRank < 6) {
        val = 1;
        t1 = 0;
    }
    else if(finalCardRank < 11) {
        val = 2;
        t2 = 2;
    }
    else {
        val = 3;
        t3 = 1;
    }

    console.log(finalCardRank, val, t1);
    

    for(let i = 0; i < 5; i++) {
        if(i == pos) {
            $('#selected-cards').append($('<img>', {src: 'JPEG/Red_back.jpg'}));
            continue;
        } if(finalCardPos == 0) {
            $('#selected-cards').append($('<img>', {src: maxCardAddress}));
        } else {
            if(val == 1) {
                $('#selected-cards').append($('<img>', {src: selectedAddresses[t1++]}));
            } else if(val == 2) {
                $('#selected-cards').append($('<img>', {src: selectedAddresses[t2--]}));
            } else {
                if(t3 == 1)
                    $('#selected-cards').append($('<img>', {src: selectedAddresses[t3--]}));
                else if(t3 == 0) {
                    $('#selected-cards').append($('<img>', {src: selectedAddresses[0]}));
                    t3 += 2;
                } else 
                    $('#selected-cards').append($('<img>', {src: selectedAddresses[t3]}));
            }
       }
        finalCardPos--;
    }

    $('img').css('cursor', 'default');
}