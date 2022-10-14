/*
function Animation()
 {
    value: 0,
    time: Date.now(),
    this.startValue = startValue;
    this.endValue = endValue;
    this.duration = duration;
    this.funcEasing = funcEasing;
}
*/

/*
function easing_mix_funcs(func1, func2, weight, t)
{
    return ((1.0 - weight) * func1(t)) + (weight * func2(t));
}

function easing_reverse(t)
{
    return 1 - t;
}

function easing_linear(t)
{
    return t;
}

function easing_linear_bounce(t)
{
    return (t < 0.5 ? t : 1 -t) * 2.0;
}

function easing_quadratic(t)
{
    return t * t;
}
*/

function easingLinear(time, from, to, duration)
{
    return from + ((to - from) * (time / duration));
}

function easingOutElastic(t, b, c, d)
{
    let s = 1.70158;
    //let p = 0;
    let a = c;
    if (t == 0) { return b; }
    if ((t /= d) == 1) { return b + c; }
    //if (!p) { p = d * 0.3; }
    p = d * 0.3;
    if (a < Math.abs(c)) {
        a = c;
        let s = p / 4;
    } else {
        let s = p / (2 * Math.PI) * Math.asin(c / a);
    }
    return (a + Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b) / 2;
}