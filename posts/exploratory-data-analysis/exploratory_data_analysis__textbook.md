# __Time Series Modeling:__ _Exploratory Data Analysis_

## ___Notebook 1:___ _Textbook Notes_

_By: Trevor Rowland_ ([@dBCooper2](https://github.com/dBCooper2))

Examining different techniques for analyzing distributions of samples and ways to evaluate these distributions.

Notes from the _Statistics and Data Analysis for Financial Engineering_ Textbook, with links to iPython notebooks that apply the theory laid out in the textbook.

### _References_:

Ruppert, David and David S. Matteson. _Statistics and Data Analysis for Financial Engineering with R examples_. $2^{nd}$ ed., Springer, 2015.

### _Table of Contents_

[__Textbook Notes__](#textbook-notes)

__..__[4.1: Introduction](#41-introduction)

__..__[4.2: Histograms and Kernel Density Estimation](#42-histograms-and-kernel-density-estimation)

__..__[4.3: Order Statistics, The Sample CDF, and Sample Quantiles](#43-order-statistics-the-sample-cdf-and-sample-quantiles)
  
__....__[4.3.1: The Central Limit Theorem for Sample Quantiles](#431-the-central-limit-theorem-for-sample-quantiles)
  
__....__[4.3.2: Normal Probability Plots](#432-normal-probability-plots)
  
__....__[4.3.3: Half-Normal Plots](#433-half-normal-plots)
  
__....__[4.3.4: Quantile-Quantile Plots](#434-quantile-quantile-plots)

__..__[4.4: Tests of Normality](#44-tests-of-normality)

__..__[4.5: Boxplots](#45-boxplots)

__..__[4.6: Data Transformation](#46-data-transformation)

__..__[4.7: The Geometry of Transformations](#47-the-geometry-of-transformation)

__..__[4.8: Transformation Kernel Density Estimation](#48-transformation-kde)

__Applying the Theory to Python__

__..__ Notebook 1: Histograms and the Kernel Density Estimator

__..__ Notebook 2: Data Analysis of Samples
   


## Textbook Notes

### _4.1 Introduction_

Looking at Figures 4.1, 4.2 and 4.3 in the textbook, there are 3 time series that fluctuate wildly. However, each time series appears _stationary_ and doesn't have a long term trend of increasing or decreasing over time. This means that while returns are random, the nature of the variation is constant over time.

<div style="display: flex;">
    <div style="flex: 33.33%; padding: 5px;">
        <img src="../../docs/notebook_images/time_series_modeling/fig_4_1.png" style="width: 100%;">
    </div>
    <div style="flex: 33.33%; padding: 5px;">
        <img src="../../docs/notebook_images/time_series_modeling/fig_4_2.png" style="width: 100%;">
    </div>
    <div style="flex: 33.33%; padding: 5px;">
        <img src="../../docs/notebook_images/time_series_modeling/fig_4_3.png" style="width: 100%;">
    </div>
</div>

Additionally, the textbook mentions that _volatility clustering_ appears in the graphs, where the volatility of an asset changes over time. This means there are periods of high and low volatility within a time series that can be measured.

Each time series can be modeled as a sequence $Y_1,Y_2,...$, where each $Y_i$ is a random variable. These random variables $Y$ each have a Cumulative Distribution Function(CDF) that is labeled as $F$. $F$ varies between series, but is assumed to be constant within a single series. 

#### _Appendix 2.1:_ Cumulative Distribution Functions

The _Cumulative Distribution Function_ of $Y$ is defined as:

$$F_Y(y) = P\{Y \leq y\}$$

If $Y$ has a __Probability Distribution Function__, or PDF, labeled $f_Y$, then

$$F_Y(y) = \int_{-\infty}^{y} f_Y(u) \,du $$

#### _Probability Distribution Functions:_

Probability Distribution Functions(PDFs) are mathematical functions that give the probabilities of expected observations for a given input.

Some examples are the Normal, the Lognormal, and the Hypergeometric Distribution.

In my MATH 3470 class, Probability Distribution functions are called __Probability Mass Functions__, describing the 'mass' of observations more clearly.

#### Back to _4.1: Introduction_
While $F$ is a CDF, it can also be called a Marginal Distribution Function. By a _Marginal_ distribution of a stationary time series, it is meant that $Y_t$ is a marginal distribution given that there is no knowledge of other $Y_s$ for any $s\neq t$

This means that for modeling marginal distributions, dependencies can be ignored in the time series.

For this reason, marginal distributions can also be called _unconditional distributions_. Dependencies like autocorrelation and volatility clustering will be discussed in later notebooks.

### _4.2: Histograms and Kernel Density Estimation_

Assume that the Marginal CDF $F$ has a probability density function $f$. __The probability density can be estimated using a Histogram__. 

This is a good first measure to look at the probability density, however outliers like the -.23 return in Fig. 4.1 are essentially invisible. Because those outliers are not bad data and should be studied, a better function to estimate the probability density should be used.

This better function is called the ___kernel density estimator___.

#### The Kernel Density Estimator

The Kernel Density Estimator, or KDE, based on the random events from the time series $Y_1, ..., Y_n$ is:

$$\hat{f}(y) = \frac{1}{nb}\sum_{i=1}^{n}K(\frac{y-Y_i}{b})$$

Where:

$K$ is the probability density function(and is symmetric about 0)

$b$ is the _bandwidth_, and determines the resolution of the estimator

$y$ is the input of the probability distribution function

$Y_i$ is the random event

and $n$ is the number of random events

#### Interpreting the KDE

A small $b$ means the estimator will have _high variance, but low bias_

A large $b$ means the estimator will have _low variance, but high bias_

This presents a tradeoff. While modern statistical software can usually automatically select the proper $b$-value, KDE's should still be graphed at different bandwidths and inspected visually.

The KDE is used to suggest what type of statistical model should be used. 

In textbook figure 4.6, the KDE's shown are bell-shaped, implying a suitable model could be the normal distribution. Figure 4.7 tests this by graphing the estimate KDE against the normal distribution's density to compare the fit between the two.

<div style="display: flex;">
    <div style="flex: 33.33%; padding: 5px;">
        <img src="../../docs/notebook_images/time_series_modeling/fig_4_6.png" style="width: 100%;">
    </div>
    <div style="flex: 33.33%; padding: 5px;">
        <img src="../../docs/notebook_images/time_series_modeling/fig_4_7.png" style="width: 100%;">
    </div>
</div>

### Problems with the KDE

The main issue seen in Figs. 4.6-7 with the KDE is the parameters for the model must be estimated properly. 

Thankfully, there are other, better methods to compare samples to a theoretical distribution that will be outlined below.

### More Notes on the KDE

In the Python Exercises for this notebook, the KDE notes are expanded to better understand how the estimator function works. These notes can be found [here](/Users/dB/Documents/repos/github/pythonic-finance/notebooks/time_series/exploratory_data_analysis__python_hists_kde.ipynb) in _The Kernel Density Estimator_ Section.

### ___4.3: Order Statistics, the Sample CDF, and Sample Quantiles___

#### __The Sample CDF__

Take a random sample from a probability distribution with a CDF $F$. From this selection, $F$ and it's quantiles are estimated.

The _sample_ or _empirical CDF,_ $F_n(y)$, is defined as the proportion of the sample that is less than or equal to $y$.

For example, if 20 out of $n=$ 40 elements of the sample are 3 or less, then $F_n(3) = .5$. This can be expressed generally as:

$$F_n(y) = \frac{\sum_{i=1}^{n}I\{Y_i \leq y\}}{n}$$

Where:

$I$ is the indicator function, $I\{Y_i\leq y\}$ is 1 if $Y_i \leq y$, and $I$ is 0 otherwise

This means that the sum in the numerator is counting the number of $Y_i$(random events) that are less than or equal to $y$

Fig. 4.8 illustrates this Empirical Distribution Function(EDF) graphed against the Cumulative Distribution Function(CDF):

<div style="display: flex;">
    <div style="flex: 33.33%; padding: 5px;">
        <img src="../../docs/notebook_images/time_series_modeling/fig_4_8.png" style="width: 100%;">
    </div>
</div>

#### __Order Statistics__

Given a series of events:

$$Y_1, Y_2, ..., Y_n$$

The _Order Statistics_ are the events ordered from smallest to largest, and can be denoted as:

$$Y_{(1)}, Y_{(2)}, ..., Y_{(n)}$$

#### __Sample Quantiles__

Sample Quantiles are defined differently by different authors. Some round up, others round to the nearest integer, and others interpolate.

Roughly speaking, the _q_-sample quantile, 0<_q_<1 is $Y_{(k)}$, where $k$ is $q*n$ rounded to an integer.

Usually for large samples like financial data, the different methods of computing sample quantiles lead to nearly identical values, but for small samples the sample quantiles can be different depending on what method is used.

### _4.3.1: The Central Limit Theorem for Sample Quantiles_

If a sample is sufficiently large, estimators will often have an approximate normal distribution. This is also true for sample quantiles using the following central limit theorem:

Let $Y_1,...,Y_n$ be an independently and identically distributed(i.i.d.) sample with a CDF $F$. Suppose $F$ has a density, $f$ that is continuous and positive at $F^{-1}(q), 0<q<1$. For large $n$, the $q$-th sample quantile is approximately normally distributed, with mean equal to the population quantile $F^{-1}(q)$ and variance equal to:

$$\frac{q(1-q)}{n[f\{F^{-1}(q)\}]^2}$$

Where:

$f$ is estimated by the KDE

$F^{-1}(q)$ can be estimated by the $q$-th sample quantile.

You can alternatively construct a confidence interval by resampling.

### _4.3.2: Normal Probability Plots_

Statistical models often assume that a random sample comes from a normal distribution. For example, log returns are assumed to be normally distributed, but this isn't always the case.

To evaluate if a sample is normally distributed, then the $q$-th sample quantile will be approximately equal to $\mu+\sigma \phi^{-1}(q)$, which is the population quantile.

Therefore, a plot of the sample quantiles compared to the population quantiles ($\phi^{-1}(q)$) will be linear (with sample quantiles on the x-axis and population quantiles on the y-axis to match the textbook).

If the plot is non-linear, then it can be assumed that the sample is __not normally distributed__.

If a pattern is non-linear, then check where the plot is concave and where it is convex. Figure 4.9 illustrates the 4 types of nonlinear plots that can occur: Convex, Concave, Convex-Concave, and Concave-Convex.

![fig_4_9.png](exploratory_data_analysis__textbook_files/fig_4_9.png)

Here is what the above charts indicate:

- __Convex__: Left Skewness

- __Concave__: Right Skewness

- __Convex-Concave__: Heavy Tails compared to the normal distribution

- __Concave-Convex__: Light Tails compared to the normal distribution

Heavy Tails means there are more observations in the 'tails' of the sample distribution than there would be in a normal distribution, and Light Tails means there are fewer than in a normal distribution.

The textbook defines a tail as any value that falls in the set:

$$\forall x, x\in\{-\infty:\mu-2\sigma\}\cup\{\mu+2\sigma:\infty\} $$

Where $x$ is an observation in the sample.

Additionally, the median and MAD could replace $\mu$ and $\sigma$, respectively, as they are less sensitive to tail weight.

#### __Best Practices for Normal Probability Plots__

Add a reference line to the normal plot to give a better idea of if the plot is reasonably linear

Graph the line in point-slope form with the 1st and 3rd quartile pairs of each set of quantiles. The formula for the line is:

$$ y-Q_{1p} = \frac{Q_{1s}-Q_{3s}}{Q_{1p}-Q_{3p}}(x-Q_{1s})$$

Where $Q_1, Q_3$ are the first and third quartiles corresponding to the sample($s$) and the population($p$)

Additionally, try a least-squares fit to all of the quantiles, or use a subset of the quantiles like [.1,.9] to avoid outliers influencing the line.

A plot is not enough to determine normality, especially if the sample size is small! See [Section 4.4](#44-tests-of-normality) to see ways to evaulate the normality of the distribution.

Lastly, the chapter introduces t-distributions, which the textbook claims are a reasonable model for stock returns and other market data.



### _4.3.3: Half-Normal Plots_

Half-Normal plots are a variation of the normal plot used to detect outliers, rather than checking for a normal distribution.

This is acheived by taking a set of data $Y_1, ..., Y_n$ and checking the absolute deviations $|Y_1-\bar{Y}|, ..., |Y_1-\bar{Y}|$ to see if any values are unusual.

To plot a half-normal plot, plot these deviations against the quantiles of a normal distribution $Z$ where $Z$ is $N(0,1)$, or $Z$ is normally distributed with a mean of 0 and a variance of 1.

### _4.3.4 Quantile-Quantile Plots_

A Normal Probability Plot is a special case of a _quantile-quantile plot_, or a _QQ Plot_. A QQ Plot is a plot of one sample or distribution plotted against a second sample or distribution.

This is useful for comparing the distribution of samples and examining the relationship between the two.

###### Note to Self: come back to this later and try graphing each distribution found here as a QQ plot: https://www.math.wm.edu/~leemis/chart/UDR/UDR.html

### ___4.4: Tests of Normality___

Alongside a normal probability plot, testing the normality of the distribution is a good practice.

###### Definitely come back to this later, for now here are the tests to go and research:

- Shapiro-Wilk test: uses covariance and correlation

- Jarque-Bera test: uses skewness and kurtosis

- Anderson-Darling test

- Cramér-von Mises test

- Kolmogorov-Smirnov tests

Each of the tests without a description compare the sample CDF to the normal CDF to determine normality.

The quick rundown is that a small p-value indicates the sample is not from a normal distribution.

### ___4.5: Boxplots___

Boxplots are very useful visualizations for examining samples. They use the 5-number summary to generate a plot of the Median, IQR and the Upper and Lower Whiskers as well as any outliers in the sample. 

An example use of boxplots would be to see a comparison between the companies ADI, AMAT and AMD's adjusted close prices over the last 5 years:

![returns_boxplots.png](exploratory_data_analysis__textbook_files/returns_boxplots.png)

### ___4.6: Data Transformation___

Data Transformation is a powerful tool to better compare statistical data than the raw observations.

Just like with log vs net returns in the last notebook, data analysts may also use the logs, square roots, or power transformations of different data.

Many statistical methods work best when the data are normally distributed, or at least are symmetrically distributed with a common variance, therefore transforming the data to fit that can help analysts understand it better.

A transformation is called __variance stabilizing__ if it removes a dependence between the conditional variance and conditional mean of a variable. 

###### Come back to this when you go over Poisson Distribution in Math 3470

### ___4.8: The Transformation Kernel Density Estimator___

#### __Drawbacks of the KDE__

The KDE undersmooths densities with long tails. This issue occurs because there is no single bandwidth that can estimate the "bumps" that appear from variation in long tails. 

This undersmoothing is not just damaging to the tails of the model, but to the entire model itself, as this incorrect bandwidth selection could lead to oversmoothing in the center of the distribution too.

This oversmoothing can potentially cause the height of the density at the mode or modes to be underestimated.

#### __The Transformation Kernel Density Estimator__

The _transformation kernel density estimator_, or _TKDE_, is a transformation of the sample data so the density is better estimated by the KDE.

This transformation is not a given, and must be selected for each set of data. Typically, the logarithm and the square root are common transformations, so these should be tested first.

The method for computing the TKDE is as follows:

1. Start with data $Y_1, ..., Y_n$

2. Transform the data to $X_1 = g(Y_1), ..., X_n = g(Y_n)$

3. Let $\hat{f_X}$ be the usual KDE, calculated on a grid with $x_1, ..., x_m$ using $X_1, ..., X_n$

4. Plot the Pairs $[g^{-1}(x_j), \hat{f_X}(x_j)|g'\{g^{-1}x_j\}]$ for $j=1, ..., m$

## Applying the Theory to Python

This section has been moved to new notebooks because VSCode kept crashing with all of the cells

Python Notebook 1: Histograms and the Kernel Density Estimator

Python Notebook 2: Data Analysis of Samples
