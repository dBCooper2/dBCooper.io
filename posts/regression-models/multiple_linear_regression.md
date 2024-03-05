# __Multiple Linear Regression in Python__

By: Trevor Rowland ([dBCooper2](https://github.com/dBCooper2))

Creating a Multiple Linear Regression Model from Scratch.

Expanding on the Simple Linear Regression notebook, this notebook aims to implement a Multivariate Linear Regression Model for use in Fama-French 3-Factor and 5-Factor Analysis.

__ADD AN IMAGE HERE__

### _References_

[Multiple Linear Regression from scratch using only numpy](https://medium.com/analytics-vidhya/multiple-linear-regression-from-scratch-using-only-numpy-98fc010a1926) by [Debidutta Dash](https://dddash11.medium.com/)

[Deriving Normal Equation for Multiple Linear Regression](<https://medium.com/@bhanu0925/deriving-normal-equation-for-multiple-linear-regression-85241965ee3b>) by [Bhanumathi Ramesh](https://medium.com/@bhanu0925)

[Matrix Approach to Multiple Linear Regression](https://youtu.be/NzuK4iAfxhU?si=cxU-v8ZBgbA1s-FG) by [LearnChemE](https://www.youtube.com/@LearnChemE)

[Matrix Form Multiple Linear Regression MLR](https://youtu.be/Imjfp1cxy6g?si=gWXnA9F_XisVzFA4) Tutorial by [Boer Commander](https://www.youtube.com/@BoerCommander)

Notation Definitions:

- Capital Letters are Vectors/Matrices
- Lowercase Letters are Scalars

## Theory

### 1. Introduction

Regression models take a series of predictor(X) variables and a single response(Y) variable, and estimates a line of best fit that can be used to predict unknown response variables.

This regression model can be applied to any series of predictor and response variables, however for the purpose of the [pythonic-finance project](https://github.com/dBCooper2/pythonic-finance), this model will be used in the Fama-French 3 and 5 factor analyses of portfolios.

#### 1.a. _The 3-Factor Model_

The Fama-French 3 Factor Model is an extension of the Capital Asset Pricing Model, aiming to describe a stock or portfolio's returns through market risk as well as the outperformance of small-cap companies relative to large-cap companies and the outperformance of high market-to-book value companies relative to low market-to-book value companies.

The model suggests that both small-cap stocks and stocks with a high market-to-book ratio tend to regularly outperform the overall market, and thus should be factored into the model.

This data can be found in [Dr. Kenneth French's]() data library and will be used for this model.

The formula for the 3-factor model is:

$$ R_i-R_{rf} = \alpha + \beta_1(R_{rf}-R_m) + \beta_2(SMB) + \beta_3(HML) + \epsilon_i$$

Where:

$R_i$ is the expected rate of return

$R_{rf}$ is the risk-free rate

$SMB$ = _Small Minus Big_, the historic excess returns of small-caps over large-caps

$HML$ = _High Minus Low_, the historic excess returns of high market-to-book ratio companies over low market-to-book ratio companies

$\beta_{1,2,3}$ are the coefficients of each factor, estimated by the regression model

$\alpha$ is the excess return on investment

$\epsilon_i$ is the noise within the model

#### 1.b. _The 5-Factor Model_

The Fama-French 5-Factor model is another iteration of the 3-Factor Model, including 2 new factors. These are:

- $RMW$ = _Robust Minus Weak_, the average return on two robust operating-profitability portfolios minus the average return on two weak operating-profitability portfolios.

- $CMA$ = _Conservative Minus Aggressive_, the average return on two conservative investment portfolios minus the average return on two aggressive investment portfolios.

These Factors are also found in [Dr. Kenneth French's]() data library, and will be used for this model.

The formula for the 5-Factor Model is:

$$ R_i-R_{rf} = \alpha + \beta_1(R_{rf}-R_m) + \beta_2(SMB) + \beta_3(HML) + \beta_4(RMW) + \beta_5(CMA) + \epsilon_i$$

### 2. The Multiple Linear Regression Model

In the simple linear regression model, it was easy to calculate the gradient descent as there were only 2 partial derivatives to calculate. For the multiple regression model, there are 4 and 6 partial derivatives for the Fama-French Models. The derivatives are with respect to the 3-5 predictor variables, and with respect to the alpha, or y-intercept of the regression line.

Additionally, for the Fama-French Regression Class and future Regression Models, it is necessary to have an abstract Regression Model that can handle an indeterminate number of predictor variables. This means the derivation of the error function must be done in a way that can be translated to an array of size $n$ in Python. This requires the use of Matrices to simplify the calculations.

#### 2.a. _The Model_

The Multiple Linear Regression Model is:

$$y = \beta_0 + \beta_1x_1+\beta_2x_2+...+\beta_px_p + \epsilon_i$$

Which can be translated into the Matrix Form:

$$
Y_i = 

\begin{bmatrix}
\beta_0 & \beta_1 & ... & \beta_p
\end{bmatrix}

\begin{bmatrix}
X_0 \\
X_1 \\
... \\
X_p \\
\end{bmatrix}

, X_0 = 1
$$

Setting $X_0 = 1$ allows the matrices to be the same size, which simplifies the calculations by including the Y-intercept Beta($\beta_0$) in the coefficient matrix.

#### 2.b. _The Error Function_

The error function that will be minimized in the model is the Sum of Squared Errors, which measures variation within a cluster of data.

The Formula for the Sum Squared Errors(SSE) is: $$E = SSE = \sum_{i=1}^{n} \epsilon_i^2 = \sum_{i=1}^{n}(y_i-\hat{y_i})^2$$

This is a sum of each of the squared differences between the observed response variable $y_i$ and the estimated response variable $\hat{y_i}$.

The Matrix form of the SSE formula is:

$$ E = SSE = \sum_{i=1}^{n} \epsilon_i^2 = \mathcal{E}^T\mathcal{E}$$

Instead of squaring the matrices, the error matrix is multiplied by its transpose. This is done because the errors are an $n{\times}1$ matrix, and computing $\epsilon_i^2$ is not possible, so the transpose is used instead.

An expansion of this equation using vectors is provided below:

$$E =
\sum_{i=1}^{n}
\begin{bmatrix}
y_1 - \hat{y_1}& 
y_2 - \hat{y_2}&  
... &  
y_n - \hat{y_n}
\end{bmatrix} 

\begin{bmatrix}
y_1 - \hat{y_1}\\
y_2 - \hat{y_2}\\
\vdots \\
y_n - \hat{y_n}
\end{bmatrix}
$$

#### 2.c. _Computing the Error Function for the MLR Model_

In Linear Algebra, the transpose of a sum can be decomposed in the following ways:

$$(A+B)^T = A^T+B^T$$

$$(A-B)^T = A^T-B^T$$

Which means the transpose operator in $E = \hat{\mathcal{E}}^T\hat{\mathcal{E}}$ can be distributed, making the function:

$$ E = \sum_{i=1}^{n}(Y^T-\hat{Y}^T)(Y-\hat{Y})$$

Substituting the matrix form $\hat{Y} = X \beta$ into the error function returns:

$$ E = \sum_{i=1}^{n}(Y^T-(X \beta)^T)(Y-(X \beta))$$

$$ E = \sum_{i=1}^{n}[Y^T Y - Y^T X \beta - Y(X \beta)^T + (X \beta)^T (X \beta)]$$

In order to finish simplifying the equations, the following terms must be proven equal in order to simplify into the solution $\hat{\beta} = (X^T X^{-1})(X^T Y)$:

$$(X \beta)^T Y = Y^T (X \beta)$$

Let $Y = A, X \beta=B$:

Therefore the equation $(X \beta)^T Y = Y^T (X \beta)$ becomes $A^T B = B^T A$

By Linear Algebra, 

$$ (AB)^T = B^T A^T, (A+B)^T = A^T + B^T $$
$$ (A^T B)^T = B^T A, (A-B)^T = A^T - B^T $$

Therefore

$$ A^T B = B^T A = (A^T B)^T $$

$$Y^T (X \beta)  = (Y^T (X \beta))^T$$

Substituting this back into the SSE Equation allows it to be simplified:

$$ E = \sum_{i=1}^{n} Y^T Y - Y^T X \beta - Y(X \beta)^T + (X \beta)^T (X \beta)$$

$$ E = \sum_{i=1}^{n} Y^T Y - 2Y^T X \beta + (X \beta)^T (X \beta)$$

#### 2.d. _The Partial Derivative of the Error Function_

Now that the error function is expanded to include the equation of the MLR Model, the partial derivative of the error function can be computed.

The partial derivative is used to compute how much the error within the model is changing, and is iteratively calculated to minimize each coefficient $\beta$. It is important to note that this partial derivative is merely an estimate, as the data is a series of discrete observations and not continuous.

The vector of the minimized values of each $\beta$ are labeled $\hat{\beta}$ in the _Normal Equations_, which are the results of the minimization process.

$$ \frac{\partial E}{\partial \beta} = \frac{\partial}{\partial \beta} ( \sum_{i=1}^{n} Y^T Y - 2Y^T X \beta + (X \beta)^T (X \beta)) $$

$$ \frac{\partial E}{\partial \beta} = \sum_{i=1}^{n} 0 - 2Y^T X + 2X^T \beta^T X$$

Then setting the partial derivative equal to 0 and solving for $\hat{\beta}$, the equation becomes:

$$ 0 = 0 - 2Y^T X + X^T \hat{\beta}^T X$$

$$ 2Y^T X = X^T \hat{\beta}^T X$$

$$ \hat{\beta}^T = \frac{2Y^T X}{2X^T X}  = (Y^T X)(X^T X)^{-1}$$

$$ \hat{\beta} = [(Y^T X)(X^T X)^{-1}]^T $$

$$ \hat{\beta} = (Y^T X)^T [(X^T X)^{-1}]^T $$

$$ \hat{\beta} = (X^T Y) (X^T X)^{-1} $$

Lastly, the Normal Equations can be found by rearranging the equation:
$$X^TX\hat{\beta} = X^T Y$$

#### 2.e. _Interpreting the Theory to Translate into an Algorithm_

$\hat{\beta}$ is the _Least Squares Estimator_ for the model. This means that it is a coefficient matrix that can take the observed $x$ and $y$ values and estimate a value for each $\beta$ in the model.

In the Simple Linear Regression Model, the Formula for the Gradient Descent of the slope was:

$$m_{new} = m_{current} - \frac{\partial E}{\partial m}$$

The Normal Equations bypass this iterative gradient descent process, and perform the gradient descent in one step. By plugging the dataset into the Normal Equations formula for $\hat{\beta}$, the optimal $\beta$ coefficients for each predictor variable are computed without needing iteration like in the Simple Linear Regression Model.

## Applying the Theory to Python

The necessary packages for this section are NumPy, Pandas, YFinance, MatPlotLib and Seaborn.

The CSV Data for the 3 and 5 Factor Models can be found in [Dr. Kenneth French's Data Library]() and will be downloaded and added to a CSV file in another Python Script to reduce the complexity of this notebook. The CSV file with the combined dataset will be available [here]().


```python
import numpy as np
import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
```

### 1. Function Definitions

Because the Normal Equations solve for the gradient descent in one step, the Multiple Linear Regression function needs to take a DataFrame and convert it into the necessary NumPy arrays, then compute each part of the Normal Equations to solve for $\hat{\beta}$. Recall that the formula for the vector $\hat{\beta}$ is:

$$ \hat{\beta} = (X^T Y) (X^T X)^{-1} $$


```python
def multiple_linear_regression(df:pd.DataFrame)->pd.DataFrame:
    x = df.filter(like='x_').values
    y = df.filter(like='y_').values

    xT = x.T
    xTx = np.dot(xT, x)
    xTx_inv = np.linalg.inv(xTx)

    xTy = np.dot(xT,y)

    betas = np.dot(xTx_inv, xTy)

    return betas
```

#### 1.a. _Preparing the DataFrame for the Normal Equations_

### 2. Accessing the Data and Performing Multiple Linear Regression

The Data was written to a CSV file using the Script 'dataset_creator.py' in the /notebooks/regression_models/multiple_linear_regression_files/ directory in the project. This CSV contains the Fama-French Library Data, as well as the Stock returns for AMD.


```python
ff_3_df = pd.read_csv('/Users/dB/Documents/repos/github/pythonic-finance/notebooks/regression_models/multiple_linear_regression_files/ff_3_factor.csv')
ff_5_df = pd.read_csv('/Users/dB/Documents/repos/github/pythonic-finance/notebooks/regression_models/multiple_linear_regression_files/ff_5_factor.csv')
```

Now that the data has been accessed, the Multiple Linear Regression can be run on each dataset:


```python
betas_3_factor = pd.DataFrame(multiple_linear_regression(ff_3_df)).T

new_cols = {0:'alpha', 1:'mkt-rf', 2:'smb', 3:'hml'}
betas_3_factor.rename(columns=new_cols, inplace=True)

betas_3_factor
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
      <th>alpha</th>
      <th>mkt-rf</th>
      <th>smb</th>
      <th>hml</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.117517</td>
      <td>1.520856</td>
      <td>0.104164</td>
      <td>-0.78295</td>
    </tr>
  </tbody>
</table>
</div>




```python
betas_5_factor = pd.DataFrame(multiple_linear_regression(ff_5_df)).T

new_cols = {0:'alpha', 1:'mkt-rf', 2:'smb', 3:'hml', 4:'rmw', 5:'cma'}
betas_5_factor.rename(columns=new_cols, inplace=True)

betas_5_factor
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
      <th>alpha</th>
      <th>mkt-rf</th>
      <th>smb</th>
      <th>hml</th>
      <th>rmw</th>
      <th>cma</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th>0</th>
      <td>0.127646</td>
      <td>1.467586</td>
      <td>-0.067626</td>
      <td>-0.557057</td>
      <td>-0.151023</td>
      <td>-0.574484</td>
    </tr>
  </tbody>
</table>
</div>



### 3. Visualizing the Regression Results

Now that the Regression Results have been computed for both the 3 and 5 factor models, some visualizations are needed to examine what the results look like

_______________

The Functions used in this Notebook will be translated into Python Classes within the [scripts]() folder of this project. The last part of this project involves generating ANOVA Tables for each model, and then the OOP implementations will begin to be added. If the programs are not here when you are reading this, they will be soon so check back later : )
