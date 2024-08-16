$(document).ready(function()
{
    $('.modal').modal();
});

function inputToDisplay(input) 
{
    const display = document.getElementById('display_input');
    display.innerHTML += input;
    display.scrollLeft = display.scrollWidth;
    
}

function clearDisplay()
{
    const display = document.getElementById('display_input');
    const result = document.getElementById('results_display');
    display.innerHTML = '';
    result.innerHTML = '';
}

function deleteInput()
{
    const display = document.getElementById('display_input');
    display.innerHTML = display.innerHTML.slice(0, -1);
}

function solveSquare()
{
    var expression = document.getElementById('display_input').innerHTML;
    var result = document.getElementById('results_display');
    var calculation;

    calculation = math.square(expression);
    if (calculation == undefined)
    {
        result.innerHTML = 'insert a number expression';
        setTimeout(function (){
            result.innerHTML = '';
        }, 5000);
    }
    else
    result.innerHTML = calculation;
}

function solveSquareRoot()
{
    var expression = document.getElementById('display_input').innerHTML;
    var result = document.getElementById('results_display');
    var calculation;

    calculation = math.sqrt(expression);
    if (calculation == undefined)
    {
        result.innerHTML = 'insert a number expression';
        setTimeout(function (){
            result.innerHTML = '';
        }, 5000);
    }
    else
    result.innerHTML = calculation;
}

function evaluateExpression()
{
    var expression = document.getElementById('display_input').innerHTML;
    var result = document.getElementById('results_display');
    var calculation;

    
    calculation = math.evaluate(expression);
    if (calculation == undefined)
    {
        result.innerHTML = 'insert a proper math expression';
        setTimeout(function (){
            result.innerHTML = '';
        }, 5000);
    }
    else
        result.innerHTML = calculation;

}
