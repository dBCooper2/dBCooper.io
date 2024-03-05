# Benchmarking Portfolio Performance

To measure a portfolio's results, we can use several measures to evaluate its performance. The measures covered in this notebook are the Treynor Measure, the Sharpe Ratio, the Jensen Measure, the Tracking Error, the Information Ratio, and the Sortino ratio. This Notebook will be a Pythonic representation of Dr. James Forjan's video on Modern Portfolio theory, found here: <https://www.youtube.com/watch?v=UiLKoRKppY8&list=PLZkFC0ERZOdK4lmUCoF826HUskbIMS9mu&index=8>

## __The Treynor Measure__

The Treynor Measure is a performance metric that tracks how much __excess return__ was created for each __unit of risk__ taken on by a portfolio. It measures a fund's __return with respect to its volatility__. 

A higher Treynor Ratio means that the fund is performing well at a __lower risk level than the general market__

The Formula for the Treynor Ratio is as follows:

$$Treynor\;Ratio = \frac{r_p - r_f}{\beta_p}$$

Where:

$r_p$ = portfolio return

$r_f$ = risk-free rate

$\beta_p$ = beta of the portfolio

#### __Usage:__

- Ranking __Well-Diversified Portfolios__ with different levels of risk
- Portfolios that constitute part of an individual's personal wealth

#### __Derived From:__ CAPM

## __The Sharpe Measure__

Like the Treynor Ratio, the Sharpe Maeasure is __the average return earned in excess of the risk-free rate per unit of volatility__

However, the Treynor Ratio only considers the systematic risk of the portfolio, while the Sharpe measure accounts for the __total risk of the portfolio__.

The Formula for the Sharpe Measure is as follows:

$$Sharpe\;Ratio = \frac{r_p - r_f}{\sigma_p}$$

Where:

$E(R_p)$ is the portfolio's expected return

$R_f$ is the risk-free rate

$\sigma(R_p)$ is the standard deviation of returns of the portfolio


#### __How do we interpret the Sharpe Ratio?__

- The Portfolio with the __Highest Sharpe Ratio__ has the __best performance__
- The Sharpe Ratio assumes the portfolio is __not__ fully diversified, nor will it be combined with other diversified portfolios
- We should consider the Sharpe Ratio when comparing __mutually exclusive portfolios__

#### __Usage:__

- Ranking Portfolios with different levels of risk
- Not very well-diversified portfolios
- Portfolios that constitute an individual's personal wealth

#### __Derived From:__ Portfolio Theory

## __The Jensen Measure__

Jensen's Alpha is the excess return above or below the Security Market Line, and can be interpreted as __how much a portfolio "beat the market"__

The formula for Jensen's Alpha is as follows:

$$ Jensen's\;Alpha = \alpha_p = R_p - [R_f + \beta_p(R_m - R_f)]$$

Where:

$\alpha_p$ is the extra return

$R_p$ is the Actual Return

$[R_f + \beta_p(R_m - R_f)]$ is the CAPM Expected Return

#### __How to Interpret Jensen's Alpha__

- __Positive Alpha__ signals __superior risk-adjusted returns__, and that the manager is good at __selecting stocks__ or __predicting market turning points__
- Jensen's Method __only accounts for systematic risk__ - It does not consider the ability of the manager to diversify
- The values of alpha can be used to __rank portfolios/managers__, with the alpha representing the __maximum__ an investor should pay for the active management of that portfolio

#### __Usage:__

Ranking Portfolios with __the same beta__

#### __Derived From:__ CAPM

## __Which performance measure should we use?__

### __Sharpe Ratio__

- Useful for evaluating an entire portfolio
- However, the Sharpe Ratio penalizes a portfolio for being undiversified, because in general the total risk = systematic risk if and only if the portfolio is well-diversified

### __Treynor Ratio/Jensen's Alpha__

- Useful for the evaluation of individual securities or portfolios __to possibly include__ into an existing portfolio
- Difference between Treynor Ratio and Jensen's Alpha:
  - Treynor Ratio standardizes returns relative to the beta
  - Both require a __beta estimate__, and betas from different sources can vary wildly

## __The Tracking Error__

Tracking Error is the __divergence__ between the price behavior of a position or a portfolio and the price behavior of a benchmark

It is the standard deviation of the difference between an investment's returns and its benchmark:

$$ Tracking\;Error = TE = \sigma(R_p-R_B)$$

Where:
$\sigma$ is the standard deviation

$R_p$ is the return of the portfolio

$R_B$ is the return of the benchmark

#### __How to interpret the Tracking Error:__

- Low TE's indicate the performance of the portfolio is close to the performance of the benchmark
  - Low errors are common among index funds and ETF's that replicate the composition of stock market indices
  - Does this mean that if you get a low TE that your model is well-tuned???
- High Tracking Errors indicate the portfolio is wildly different from the benchmark
  - Portfolios like these can either substantially beat or underperform the benchmark, and the benchmark should be re-evaluated to see what went wrong

## __The Information Ratio__

The Information Ratio(IR) is a measurement of portfolio returns beyond the returns of a benchmark, usually an index, compared to the volatility of those returns

The information ratio is the alpha of the managed portfolio relative to its benchmark divided by the tracking error

$$Information\;Ratio = IR = \frac{Portfolio\;Return - Benchmark\;Return}{Tracking\;Error}$$

This IR represents a manager's ability to use information to generate excess returns

An example of using the Information Ratio could be to take a handful of stocks in a sector, create a portfolio of them, then use the Information Ratio to track that portfolio's performance vs an index fund of that sector

## __The Sortino Ratio__

The Sortino Ratio is like the Sharpe Ratio, but there are 2 main differences:
- The Risk-Free rate is replaced with a __minimum acceptable return__, denoted as $R_min$
- The Standard deviation is replaced by a __semi-standard deviation__ which measures variability only of returns that fall below the minimum accepted return

The Measure of Risk, $MSD_{min}$, is the square root of the __mean squared deviation__ from $R_{min}$ of those observations in time period $t$, where $R_Pt < R_{min}$, else 0

The Formula for the Sortino Ratio is as follows:

$$Sortino\;Ratio = \frac{E(R_p) - R_{min}}{\sqrt(MSD_{min})}$$


The Semi-Standard Deviation isolates the 'bad risk', because positive volatility is seen as good.
- The portfolio can go up a little or up a lot, either of those is still up

The Sortino Ratio is thought to give a better view of a portfolio's risk-adjusted performance since __positive volatility is a benefit__

