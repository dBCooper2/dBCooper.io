# This is a Test Article

By Trevor Rowland [dBCooper](https://github.com/dBCooper2)

I am testing what works and what doesn't with React-Markdown

## Headings

# Heading1

## Heading2

### Heading3

#### Heading4

##### Heading5

###### Heading6

## Bullet Points

- This is a Bullet Point - WORKS, renders as '*'
  - This is a sub-point in the list - WORKS, renders as '*'

+ This is a Bullet Point - WORKS, renders as '*'
  + This is a sub-point in the list - WORKS, renders as '*'

* This is a Bullet Point - WORKS, renders as '*'
  * This is a sub-point in the list - WORKS, renders as '*'

## LaTeX

- Inline Latex: $ \alpha $
- display latex: To center LaTeX Formulas, Here is the formatting
- When you are using LaTeX and lists, don't insert newlines between the bullets, it breaks it for some reason

dollarSignDollarSign

\begin{align}

equation1 \\\ \<- use this to end the line

equation2 \\\

...

equationN \\\

\end{align}

dollarSignDollarSign

Here is a working Aligned LaTeX Block:

$$
\begin{align}
\alpha
\beta
\gamma
\epsilon_i
\end{align}
$$

## Images

Images are normally rendered like this: 

\!\[png\]\(/path_to_file.png\)

Let's try to view an image in the folder "test-article-files":

![png]("posts/testing/test-article-files/test1.png") -> DOES NOT WORK

Let's see if it's because we aren't reaching into the public folder:

![test2](public/headshots/my-ai-headshot-flipped.png)

Lastly, let's see if an image from a URL works:

![test3](https://cdn2.thecatapi.com/images/9qLSHCaQQ.jpg)
