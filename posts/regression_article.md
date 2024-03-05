# __Univariate and Multivariate Linear Regression in Python__

#### By: Trevor Rowland ([dBCooper2](https://github.com/dBCooper2))

Describing the theory of linear regression for univariate and multivariate distributions, then applying that theory to build simple and multiple linear regression models in Python

[__ADD AN IMAGE HERE__]

### _References_

## The Theory

Regression Analysis is a tool used in statistics and finance to see how strongly related an dependent variable and one or more independent variables are. 

Regression models take a series of predictor($X$) variables and a single response(Y) variable, and estimates a line of best fit that can be used to predict unknown response variables. This notebook will first discuss univariate(single predictor variable) regression, then expand on that to perform multivariate regression with multiple predictor variables.

This regression model can be applied to any series of predictor and response variables, however for the purpose of the [pythonic-finance project](https://github.com/dBCooper2/pythonic-finance), this model will be used in the Fama-French 3 and 5 factor analyses of portfolios. These Models will be discussed in another article, as this notebook is primarily focused on the methods used to perform regression.

## 1. Simple Linear Regression

### 1.a. Introduction

This regression model uses an Ordinary Least Squares(OLS) approach to regression. The OLS model plots a line on a scatter plot, measures how far away it is from each point, then iteratively adjusts the slope and y-intercept in the linear equation to provide the line of best fit for the data.

_How does this happen?_

The Regression Model plots a line through all of the points in our dataset. 

When the line is plotted, the points on the line will be different from the points in the dataset. The difference between the actual point and the point estimated by the line can be called an error:

$$Y_i - \hat{Y}_i$$

The sum of those errors can be calculated to find the total error in the regression line. 

Squaring those errors and dividing that sum of all squared errors by the number of y-values gives us a measure called the __Mean Squared Error__, or MSE:

$$MSE=\frac{1}{n} \sum_{i=0}^{n}(Y_i - \hat{Y}_i)^2$$

given

$$ \hat{Y}_i = mx_i+b$$

### 1.b. The Mean Squared Error

__The Mean Squared Error describes what the average error is__, and to make the best-fit regression line, __that error must be minimized__. 

Because the data cannot be modified, to develop the best-fit regression line the slope, m, and the y-intercept, b,  must be modified. This involves iterating over many different calculated values of the slope and y-intercept, so how will the program know how to adjust the values across iterations?

The program will adjust the values by calculating the gradient descent of the Error, E, with respect to the slope and with respect to the y-intercept. This can be done using partial derivatives of the Error function to find the fastest way to increase the Error because derivatives measure a rate of change. Here are the calculations to find those gradient descent functions:

$$ MSE = E(\hat{Y}_i) = (\frac{1}{n}) \sum_{i=0}^{n}(Y_i - \hat{Y}_i)^2$$

which decomposes into:

$$ MSE = E(m,b) = (\frac{1}{n}) \sum_{i=0}^{n}(Y_i - (mx_i+b))^2$$


and for easier calculations, can be fully expanded into:

$$ E(m,b) = (\frac{1}{n}) \sum_{i=0}^{n}(Y_i^2 -2Y_imx_i-2Y_ib+m^2x_i^2+2mx_ib+b^2)$$

### 1.c. The Partial Derivatives of the Error Function

Taking the Partial Derivative of E(m,b) with respect to m:

$$(\frac{\partial}{\partial m})E(m,b) = (\frac{\partial}{\partial m})(\frac{1}{n}) \sum_{i=0}^{n}(Y_i^2 -2Y_imx_i-2Y_ib+m^2x_i^2+2mx_ib+b^2)$$

$$\frac{\partial E}{\partial m} = (\frac{1}{n}) \sum_{i=0}^{n}( -2Y_ix_i+2mx_i^2+2x_ib)$$

$$\frac{\partial E}{\partial m} = (\frac{-2}{n}) \sum_{i=0}^{n}(Y_ix_i-mx_i^2-x_ib)$$

$$\frac{\partial E}{\partial m} = (\frac{-2}{n}) \sum_{i=0}^{n}x_i(Y_i-mx_i-b)$$

$$\frac{\partial E}{\partial m} = (\frac{-2}{n}) \sum_{i=0}^{n}[x_i(Y_i-(mx_i+b))]$$

Taking the Partial Derivative of E(m,b) with respect to b:

$$(\frac{\partial}{\partial b})E(m,b) = (\frac{\partial}{\partial b})(\frac{1}{n}) \sum_{i=0}^{n}(Y_i^2 -2Y_imx_i-2Y_ib+m^2x_i^2+2mx_ib+b^2)$$

$$\frac{\partial E}{\partial b} = (\frac{1}{n}) \sum_{i=0}^{n}(-2Y_i+2mx_i+2b)$$

$$\frac{\partial E}{\partial b} = (\frac{-2}{n}) \sum_{i=0}^{n}(Y_i-mx_i-b)$$

$$\frac{\partial E}{\partial b} = (\frac{-2}{n}) \sum_{i=0}^{n}(Y_i-(mx_i+b))$$

After these calculations, the partial derivatives of the error function are as follows:

$$\frac{\partial E}{\partial m} = (\frac{-2}{n}) \sum_{i=0}^{n}[x_i(Y_i-(mx_i+b))]$$

$$\frac{\partial E}{\partial b} = (\frac{-2}{n}) \sum_{i=0}^{n}(Y_i-(mx_i+b))$$

### 1.d. The Gradient Descent

The gradient descent function is calculated by subtracting the partial derivative from the current value of m or b, respectively, so our equations for the learning rate look like this:

$$m_{new} = m_{current} - \frac{\partial E}{\partial m}$$

$$b_{new} = m_{current} - \frac{\partial E}{\partial b}$$

The program _subtracts_ the partial derivative because the regression analysis should use the gradient descent, and the current partial derivative calculates the gradient ascent.

This would be great if the program was going to run all at once, but because the regression function will be calculated iteratively, the partial derivatives need to be multiplied by a constant to set the step size for each iteration. This is known as the __Learning Rate__, and will be denoted by L, making the gradient descent functions: 

$$m_{new} = m_{current} - L\frac{\partial E}{\partial m}$$

$$b_{new} = m_{current} - L\frac{\partial E}{\partial b}$$


where 0 < L < 1

The learning rate value will be set later, but the important thing to note now is that the smaller the learning rate or step size, the more the model will try to fit the line to the data. For example, L=.1 is going to be less precise than L=.001, which is less precise than L=.00001, and so on.

## 2. Applying the Simple Linear Regression Theory to Python

To apply the calculations of the partial derivatives of the Error function in Python, the gradient descent function must be defined in Python, and then the program will iterate over calls to that function.

### 2.a. The Gradient Descent Function


```python
def gradient_descent(m_current, b_current, df, learning_rate):
    m_gradient = 0
    b_gradient = 0

    n = len(df) # The number of rows in the dataset

    # Calculate the partial derivative summations
    for i in range(n):
        x = df.iloc[i].x
        y = df.iloc[i].y

        # These are a pythonic representation of partial derivative equations found in the theory section
        m_gradient += (-2/n) * x * (y - (m_current * x + b_current))
        b_gradient += (-2/n) * (y - (m_current * x + b_current))

    # Calculate the Gradient Descent equations from the theory section
    m = m_current - learning_rate * m_gradient
    b = b_current - learning_rate * b_gradient

    return m,b
```

[Describe the Function Here]

### 2.b. Performing Linear Regression

Now that the gradient descent function is complete, a function to iteratively call that function is needed to minimize the error of the regression line


```python
def ols_regression(learning_rate, iterations, df):
    m = 0
    b = 0

    for i in range(iterations):
        m,b = gradient_descent(m, b, df, learning_rate)

    return m,b
```

### 2.c. Testing the Linear Regression Model

Refactor the code to be individual functions that can be abstracted easier for readers trying to do this on their own.

### 2.d. Plotting the Regression Line

[Add the Code Here]

#### _Links to the Functions_

[Talk about how the code can be copied, but that there exists an OOP version of this code in the pythonic-finance repo that can be downloaded.]

## 3. Multivariate Linear Regression

### 3.a. Introduction

For Multivariate Linear Regression, the objective is the same. Estimate a line of best fit using predictor and response variables, only this time there are multiple predictor variables. This increases the complexity of the operations significantly, and instead of using a Gradient Descent Formula to minimize the Error Function, something called the _Normal Equations_ need to be used.

### 3.b. The Multiple Linear Regression Model

In the simple linear regression model, it was easy to calculate the gradient descent as there were only 2 partial derivatives to calculate. For the multiple regression model, there are 4 and 6 partial derivatives for the Fama-French Models. The derivatives are with respect to the 3-5 predictor variables, and with respect to the alpha, or y-intercept of the regression line.

Additionally, for the Fama-French Regression Class in  and future Regression Models, it is necessary to have an abstract Regression Model that can handle an indeterminate number of predictor variables. This means the derivation of the error function must be done in a way that can be translated to an array of size n in Python. This requires the use of Matrices to simplify the calculations.

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

The first X is 1 to match the size of the estimated coefficient matrix, which simplifies the calculations.

### 3.c. The Error Function

The error function that will be minimized in the model is the Sum of Squared Errors, which measures variation within a cluster of data.

The Formula for the Sum Squared Errors(SSE) is:

$$E = SSE = \sum_{i=1}^{n} \epsilon_i^2 = \sum_{i=1}^{n}(y_i-\hat{y_i})^2$$

This is a sum of each of the squared differences between the observed response variable and the estimated response variable.

The Matrix form of the SSE formula is:

$$ E = SSE = \sum_{i=1}^{n} \epsilon_i^2 = \mathcal{E}^T\mathcal{E}$$

Instead of squaring the matrices, the error matrix is multiplied by its transpose. This is done because the errors are an (n x 1) matrix, and computing the square of two vectors is not possible, so the transpose is used instead.

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

### 3.d. Computing the Error Function for the MLR Model


In Linear Algebra, the transpose of a sum can be expressed in the following ways:

$$(A+B)^T = A^T+B^T$$

$$(A-B)^T = A^T-B^T$$

This distribution of transpose operators can be applied to the error function, transforming the formula into:

$$ E = \sum_{i=1}^{n}(Y^T-\hat{Y}^T)(Y-\hat{Y})$$

Substituting the matrix form of the MLR Model into the error function returns:

$$ \hat{Y} = X \beta$$ 

$$ E = \sum_{i=1}^{n}(Y^T-(X \beta)^T)(Y-(X \beta))$$

$$ E = \sum_{i=1}^{n}[Y^T Y - Y^T X \beta - Y(X \beta)^T + (X \beta)^T (X \beta)]$$

In order to finish simplifying the equations, the following terms must be proven equal:

$$(X \beta)^T Y = Y^T (X \beta)$$

This will return the equation:

$$\hat{\beta} = (X^T X^{-1})(X^T Y)$$

Proof:

$$Let\;Y = A, X \beta=B:$$

$$\therefore (X \beta)^T Y = Y^T (X \beta) \implies A^T B = B^T A$$

By Linear Algebra, 

$$ (AB)^T = B^T A^T, (A+B)^T = A^T + B^T $$
$$ (A^T B)^T = B^T A, (A-B)^T = A^T - B^T $$

$$ \therefore A^T B = B^T A = (A^T B)^T $$

$$Y^T (X \beta)  = (Y^T (X \beta))^T$$

Substituting this back into the SSE Equation allows it to be simplified:

$$ E = \sum_{i=1}^{n} Y^T Y - Y^T X \beta - Y(X \beta)^T + (X \beta)^T (X \beta)$$

$$ E = \sum_{i=1}^{n} Y^T Y - 2Y^T X \beta + (X \beta)^T (X \beta)$$

### 3.e. The Partial Derivative of the Error Function

Now that the error function is expanded to include the equation of the MLR Model, the partial derivative of the error function can be computed.

The partial derivative is used to compute how much the error within the model is changing, and is iteratively calculated to minimize each coefficient. It is important to note that this partial derivative is merely an estimate, as the data is a series of discrete observations and not continuous.

$$ \frac{\partial E}{\partial \beta} = \frac{\partial}{\partial \beta} ( \sum_{i=1}^{n} Y^T Y - 2Y^T X \beta + (X \beta)^T (X \beta)) $$

$$ \frac{\partial E}{\partial \beta} = \sum_{i=1}^{n} 0 - 2Y^T X + 2X^T \beta^T X$$

Then setting the partial derivative equal to 0 and solving for beta, the equation becomes:

$$ 0 = 0 - 2Y^T X + X^T \hat{\beta}^T X$$

$$ 2Y^T X = X^T \hat{\beta}^T X$$

$$ \hat{\beta}^T = \frac{2Y^T X}{2X^T X}  = (Y^T X)(X^T X)^{-1}$$

$$ \hat{\beta} = [(Y^T X)(X^T X)^{-1}]^T $$

$$ \hat{\beta} = (Y^T X)^T [(X^T X)^{-1}]^T $$

$$ \hat{\beta} = (X^T Y) (X^T X)^{-1} $$

Lastly, the Normal Equations can be found by rearranging the equation:

$$X^TX\hat{\beta} = X^T Y$$

### 3.f. Translating the Theory into an Algorithm for Python.

The _Least Squares Estimator_ for the model has been solved for using this minimization process. This means that instead of using gradient descent like in the Simple Linear Regression Model, computing the Beta value with the normal equations can bypass the gradient descent and find the optimized values of the coefficients in one step.

This can computationally expensive than a gradient descent function, with the inverse calculation having O(n^3) and the gradient descent is O(n^2). With this tradeoff in mind, it is important to use small samples instead of large ones if it is possible.

[Add the Code]


```python
import numpy as np
import pandas as pd
import yfinance as yf
import matplotlib.pyplot as plt
```
