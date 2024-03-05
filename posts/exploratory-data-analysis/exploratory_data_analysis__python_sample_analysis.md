# __Time Series Modeling:__ _Exploratory Data Analysis_

## ___Notebook 3:___ _Sample Analysis in Python_

_By: Trevor Rowland_ ([@dBCooper2](https://github.com/dBCooper2))

Evaluating the Distributions of Samples using different estimators, transformations and plots.

## _References_

Normal Distribution Dataset - https://seattlecentral.edu/qelp/sets/057/057.html

## _Table of Contents_

## Accessing Data:

Here are the necessary Libraries for this notebook:


```python
# Import Libraries
import pandas as pd
import numpy as np
from KDEpy import FFTKDE
import matplotlib.pyplot as plt
import seaborn as sns
```

This notebook will use ASML's daily price data over the last 5 years as the data to inspect.


```python
asml_df = pd.read_csv('/Users/dB/Documents/repos/github/pythonic-finance/docs/semiconductor_csvs/ASML/ASML_Candles_Daily.CSV')

asml_df = asml_df.filter(['Date', 'Adj Close'])
asml_df = asml_df.rename(columns={'Adj Close': 'Adj_Close'})
asml_df.set_index('Date', inplace=True)

asml_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Adj_Close</th>
    </tr>
    <tr>
      <th>Date</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-25</th>
      <td>167.524933</td>
    </tr>
    <tr>
      <th>2019-01-28</th>
      <td>165.144684</td>
    </tr>
    <tr>
      <th>2019-01-29</th>
      <td>165.580917</td>
    </tr>
    <tr>
      <th>2019-01-30</th>
      <td>168.027512</td>
    </tr>
    <tr>
      <th>2019-01-31</th>
      <td>165.979218</td>
    </tr>
  </tbody>
</table>
</div>



## Computing the Sample CDF

The Sample CDF is similar to a probability distribution function(PDF), or a probability mass function like the ones described in MATH 3470. It describes a probability mass for all values $Y_i \leq y$ instead of $Y_i = y$.

Recall from the textbook notes that the Sample Cumulative Distribution Function(CDF) can be expressed as a function $F_n(y)$:

$$F_n(y) = \frac{\sum_{i=1}^{n}I\{Y_i \leq y\}}{n}$$

In this formula, $I$ is the indicator function, which means that $I\{Y_i\leq y\}=1$ when $Y_i \leq y$, and $I=0$ otherwise.

## Computing Sample Quantiles

To compare the distribution of returns to the raw prices, the log returns of ASML need to be calculated:


```python
asml_df['Log_Returns'] = np.log(asml_df['Adj_Close'] / asml_df['Adj_Close'].shift(1))
asml_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Adj_Close</th>
      <th>Log_Returns</th>
    </tr>
    <tr>
      <th>Date</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>2019-01-25</th>
      <td>167.524933</td>
      <td>NaN</td>
    </tr>
    <tr>
      <th>2019-01-28</th>
      <td>165.144684</td>
      <td>-0.014310</td>
    </tr>
    <tr>
      <th>2019-01-29</th>
      <td>165.580917</td>
      <td>0.002638</td>
    </tr>
    <tr>
      <th>2019-01-30</th>
      <td>168.027512</td>
      <td>0.014668</td>
    </tr>
    <tr>
      <th>2019-01-31</th>
      <td>165.979218</td>
      <td>-0.012265</td>
    </tr>
  </tbody>
</table>
</div>



Now the quantiles can be found using pandas's built-in quantiles() function:


```python
price_quantile_list = []
returns_quantile_list = []

i=0
while i<100:
    price_quantile_list.append(asml_df['Adj_Close'].quantile(i*.01))
    returns_quantile_list.append(asml_df['Log_Returns'].quantile(i*.01))
    i+=1
```

And finally, the quantiles should be placed into a Quantile DataFrame:


```python
quantiles_df = pd.DataFrame()

quantiles_df['percentile'] = np.arange(0,1, .01)
quantiles_df['price'] = price_quantile_list
quantiles_df['log_returns'] = returns_quantile_list

quantiles_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>percentile</th>
      <th>price</th>
      <th>log_returns</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.00</td>
      <td>165.144684</td>
      <td>-0.190545</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.01</td>
      <td>171.767194</td>
      <td>-0.062494</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.02</td>
      <td>174.608240</td>
      <td>-0.056159</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.03</td>
      <td>177.901868</td>
      <td>-0.049317</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.04</td>
      <td>182.569967</td>
      <td>-0.045006</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
      <td>...</td>
      <td>...</td>
    </tr>
    <tr>
      <th>95</th>
      <td>0.95</td>
      <td>774.368994</td>
      <td>0.039615</td>
    </tr>
    <tr>
      <th>96</th>
      <td>0.96</td>
      <td>784.292856</td>
      <td>0.041645</td>
    </tr>
    <tr>
      <th>97</th>
      <td>0.97</td>
      <td>792.994333</td>
      <td>0.048561</td>
    </tr>
    <tr>
      <th>98</th>
      <td>0.98</td>
      <td>820.974248</td>
      <td>0.052721</td>
    </tr>
    <tr>
      <th>99</th>
      <td>0.99</td>
      <td>838.133760</td>
      <td>0.062339</td>
    </tr>
  </tbody>
</table>
<p>100 rows × 3 columns</p>
</div>



### _Computing the Central Limit Theorem for Sample Quantiles_

When this is covered in MATH 3470 I will come back and revisit this, for now it is beyond my understanding and not necessary for the project.

### _Normal Probability Plots_

Normal Probability plots as a visualization to see how 'normal' a distribution is. Recall from the textbook notes that a linear relationship with the normal distribution indicates the sample is normally distributed.

The normal distribution sample used is [QELP's Data Set #057](https://seattlecentral.edu/qelp/sets/057/057.html), and is a normal distribution of the length of housefly wings. The samples will be plotted against this and tested for normality.

Here is the code to import the normal distribution, compute its quantiles, and plot it against the ASML data.

__Importing the Normal Distribution:__


```python
path = '/Users/dB/Documents/repos/github/pythonic-finance/docs/test_distributions/s057_normal_dist.csv'
normdist_df = pd.read_csv(path)
normdist_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>36</td>
    </tr>
    <tr>
      <th>1</th>
      <td>37</td>
    </tr>
    <tr>
      <th>2</th>
      <td>38</td>
    </tr>
    <tr>
      <th>3</th>
      <td>38</td>
    </tr>
    <tr>
      <th>4</th>
      <td>39</td>
    </tr>
  </tbody>
</table>
</div>



__Computing the Quantiles of the Normal Distribution:__


```python
normdist_quantile_list = list()
i=0
while i<100:
    normdist_quantile_list.append(normdist_df['Value'].quantile(i*.01))
    i+=1

quantiles_df['normal_distribution'] = normdist_quantile_list
quantiles_df['norm_dist2'] = normdist_quantile_list

quantiles_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>percentile</th>
      <th>price</th>
      <th>log_returns</th>
      <th>normal_distribution</th>
      <th>norm_dist2</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.00</td>
      <td>165.144684</td>
      <td>-0.190545</td>
      <td>36.00</td>
      <td>36.00</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.01</td>
      <td>171.767194</td>
      <td>-0.062494</td>
      <td>36.99</td>
      <td>36.99</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.02</td>
      <td>174.608240</td>
      <td>-0.056159</td>
      <td>37.98</td>
      <td>37.98</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.03</td>
      <td>177.901868</td>
      <td>-0.049317</td>
      <td>38.00</td>
      <td>38.00</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.04</td>
      <td>182.569967</td>
      <td>-0.045006</td>
      <td>38.96</td>
      <td>38.96</td>
    </tr>
  </tbody>
</table>
</div>



__Plotting the Normal Probability Plots:__


```python
fig, axs = plt.subplots(nrows=1, ncols=3, figsize=(30,10), squeeze=False)

axs[0][0].set_title('Normal Dist. vs. Adj. Close Prices; ASML; Daily, 2019-2024')
axs[0][1].set_title('Normal Dist. vs. Log Returns; ASML; Daily, 2019-2024')
axs[0][2].set_title('Normal Dist. vs. Normal Dist.')

quantiles_df.plot(x='price', y='normal_distribution', ax=axs[0][0], color = 'red')
quantiles_df.plot(x='log_returns', y='normal_distribution', ax=axs[0][1], color = 'blue')
quantiles_df.plot(x='norm_dist2', y='normal_distribution', ax=axs[0][2], color = 'purple')

plt.show()
```


    
![png](exploratory_data_analysis__python_sample_analysis_files/exploratory_data_analysis__python_sample_analysis_26_0.png)
    


From left to right, the Graphs shown are the Price Data vs. the Normal Distribution, the Log Returns vs. the Normal Distribution, and a Normal Distribution vs a Normal Distribution as a reference.

From Fig. 4.9 from the textbook, these graphs can be interpreted as concave-convex, convex and linear, respectively.

For the raw price data, the Normal Probability plot indicate that the price data sample has lighter tails than the normal distribution sample. This means the data is more concentrated towards the mean.

For the log returns, the Normal Probability plot indicates that the log return sample has left-skewness, which means the mean is to the left of the median. This can quickly be checked:


```python
mean = np.mean(quantiles_df['log_returns'])
med = np.median(quantiles_df['log_returns'])

print(f'Mean: {mean}\nMedian: {med}')
```

    Mean: -0.000666329723885859
    Median: 0.0009432665034137581


This is true, proving the left-skewness of the sample.

### _Half-Normal Plots_

Now the samples must be checked for outliers. The Half-Normal plot is a measure that can test for outliers, and is done by plotting the absolute deviations from the mean against the normal distribution.

__Computing the Absolute Deviations:__


```python
quantiles_df['price_devs'] = np.abs(quantiles_df.price - np.mean(quantiles_df.price))
quantiles_df['lr_devs'] = np.abs(quantiles_df.log_returns - np.mean(quantiles_df.log_returns))

quantiles_df.head()
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>percentile</th>
      <th>price</th>
      <th>log_returns</th>
      <th>normal_distribution</th>
      <th>norm_dist2</th>
      <th>price_devs</th>
      <th>lr_devs</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.00</td>
      <td>165.144684</td>
      <td>-0.190545</td>
      <td>36.00</td>
      <td>36.00</td>
      <td>326.353490</td>
      <td>0.189879</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.01</td>
      <td>171.767194</td>
      <td>-0.062494</td>
      <td>36.99</td>
      <td>36.99</td>
      <td>319.730981</td>
      <td>0.061827</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.02</td>
      <td>174.608240</td>
      <td>-0.056159</td>
      <td>37.98</td>
      <td>37.98</td>
      <td>316.889934</td>
      <td>0.055492</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.03</td>
      <td>177.901868</td>
      <td>-0.049317</td>
      <td>38.00</td>
      <td>38.00</td>
      <td>313.596306</td>
      <td>0.048651</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.04</td>
      <td>182.569967</td>
      <td>-0.045006</td>
      <td>38.96</td>
      <td>38.96</td>
      <td>308.928207</td>
      <td>0.044340</td>
    </tr>
  </tbody>
</table>
</div>



__Creating a Half-Normal Distribution to Plot Against__

The half-normal distribution is a normal distribution where $y=0 \forall x<=0$. This means that the normal distribution used needs to be re-centered around 0, and then converted to the half-normal:


```python
## Centering the Distribution around 0:
half_normdist_df = pd.DataFrame()
half_normdist_df['values'] = normdist_df['Value'] - np.median(normdist_df['Value'])

for i in half_normdist_df.index:
    if half_normdist_df.loc[i, 'values'] <0:
        half_normdist_df.loc[i, 'values'] = 0

half_normdist_df
```




<div>
<style scoped>
    .dataframe tbody tr th:only-of-type {
        vertical-align: middle;
    }

    .dataframe tbody tr th {
        vertical-align: top;
    }

    .dataframe thead th {
        text-align: right;
    }
</style>
<table border="1" class="dataframe">
  <thead>
    <tr style="text-align: right;">
      <th></th>
      <th>values</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.0</td>
    </tr>
    <tr>
      <th>1</th>
      <td>0.0</td>
    </tr>
    <tr>
      <th>2</th>
      <td>0.0</td>
    </tr>
    <tr>
      <th>3</th>
      <td>0.0</td>
    </tr>
    <tr>
      <th>4</th>
      <td>0.0</td>
    </tr>
    <tr>
      <th>...</th>
      <td>...</td>
    </tr>
    <tr>
      <th>95</th>
      <td>6.5</td>
    </tr>
    <tr>
      <th>96</th>
      <td>7.5</td>
    </tr>
    <tr>
      <th>97</th>
      <td>7.5</td>
    </tr>
    <tr>
      <th>98</th>
      <td>8.5</td>
    </tr>
    <tr>
      <th>99</th>
      <td>9.5</td>
    </tr>
  </tbody>
</table>
<p>100 rows × 1 columns</p>
</div>



__Adding the Half-Normal Distribution Quantiles to the Quantile DataFrame__


```python
half_normdist_quantile_list = list()
i=0
while i<100:
    half_normdist_quantile_list.append(half_normdist_df['values'].quantile(i*.01))
    i+=1

quantiles_df['half_normal_distribution'] = half_normdist_quantile_list
quantiles_df['hn2'] = half_normdist_quantile_list # dummy half-normal for plots
```

__Plotting the Half-Normal Plots__


```python
fig, axs = plt.subplots(nrows=1, ncols=3, figsize=(30,10), squeeze=False)

axs[0][0].set_title('Normal Dist. vs. Adj. Close Deviations; ASML; Daily, 2019-2024')
axs[0][1].set_title('Normal Dist. vs. Log Return Deviations; ASML; Daily, 2019-2024')
axs[0][2].set_title('Normal Dist. vs. Normal Dist.')

quantiles_df.plot(x='price_devs', y='half_normal_distribution', ax=axs[0][0], color = 'red')
quantiles_df.plot(x='lr_devs', y='half_normal_distribution', ax=axs[0][1], color = 'blue')
quantiles_df.plot(x='hn2', y='half_normal_distribution', ax=axs[0][2], color = 'purple')

plt.show()
```


    
![png](exploratory_data_analysis__python_sample_analysis_files/exploratory_data_analysis__python_sample_analysis_40_0.png)
    


These are the half-normal plots of the price, log returns and an example plot of the half-normal distribution plotted against itself. Again, the left skewness of the log returns appears, and the mostly linear nature of both plots indicates that there are no significant outliers in either sample.

### _Quantile-Quantile Plots_

The Normal Probability Plot and Half-Normal Plots are both special cases of the Quantile-Quantile Plot. For fun, here is the quantile-quantile plot of the prices vs the returns of ASML:


```python
quantiles_df.plot(x='log_returns', y='price', color='red')

plt.title('Log Returns vs. Adj Close Price QQ Plot; ASML; Daily, 2019-2024')
plt.show()
```


    
![png](exploratory_data_analysis__python_sample_analysis_files/exploratory_data_analysis__python_sample_analysis_44_0.png)
    


## Tests of Normality

Tests of normality can be done using the SciPy library. This library has the following functions:

- shapiro(): Shapiro-Wilks test

- jarque_bera(): Jarque-Bera test

- cramervonmises(): Cramér-von Mises test

- kstest(): Kolmogorov-Smirnov test




```python
from scipy.stats import shapiro, jarque_bera, cramervonmises, kstest
```

### _The Shapiro-Wilk Test_

The Shapiro-Wilk test checks to see if a sample is normally distributed.

Here are the results of the Shapiro-Wilks test on the Prices and Returns Samples:


```python
print('Shapiro Wilks Test on Adjusted Closing Prices:')
print(shapiro(asml_df['Adj_Close']))

print('\nShapiro Wilks Test on Log Returns:')
print(shapiro(asml_df['Log_Returns'].dropna()))
```

    Shapiro Wilks Test on Adjusted Closing Prices:
    ShapiroResult(statistic=0.9353744110633965, pvalue=6.380826082962216e-23)
    
    Shapiro Wilks Test on Log Returns:
    ShapiroResult(statistic=0.9653840226374104, pvalue=9.75998195455898e-17)


These low p-values indicate that the distribution for both the prices and the log returns are not normally distributed.
