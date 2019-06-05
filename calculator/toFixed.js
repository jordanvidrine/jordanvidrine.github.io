function myToFixed(number, precision) {
  var numToStr = number.toString();
  //checks to see if number was passed with a decimal
  if (!numToStr.split('').includes('.')) {
    numToStr = numToStr + '.0';
  }
  var leftSide = numToStr.split('.')[0];
  var rightSide = numToStr.split('.')[1];
  var preciseNumber = '';

  //handles right side of decimal place if its length is greater than the precision
  if (rightSide.split('').length > precision) {
    //addes an additional number to the right side, to round the precision number up or down
    rightSide = rightSide.split('').splice(0, precision + 1);

    //defines the last number (rightSideLeft) and the
    //number to use to round the last number up or down (rightSideRight)
    var numToRound = rightSide[rightSide.length - 2];
    var rounder = rightSide[rightSide.length - 1];

    //if rounder is greater than 4 increase numToRound by 1
    if (Number(rounder) > 4) {
      numToRound = (Number(numToRound) + 1).toString();
    } else {
      numToRound = Number(numToRound).toString();
    }
    // create the new 'rightSide' of the decimal and add
    // the rounded number as the last element
    rightSide = rightSide.splice(0, precision - 1).concat([numToRound]).join('');
    //add the left and ride side with a '.' between them to
    //give the rounded number back to user
    preciseNumber = leftSide + '.' + rightSide;
    //if the right side is less than the precision number pad with '0s'
  } else {
    var padding = Array(precision - rightSide.length).fill(0);
    rightSide = rightSide.split('').concat(padding).join('');
    preciseNumber = leftSide + '.' + rightSide;
  }
  return preciseNumber;
}