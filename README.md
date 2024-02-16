# VScode Portfolio

A Visual Studio Code themed developer portfolio website built with Next.js and deployed on Vercel.

![vscode-portfolio banner]((https://github.com/dBCooper2/dBCooper.io/blob/main/public/github_imgs/homepage.png))

Huge shoutouts to the [original project](https://github.com/drkostas/drkostas.github.io) by [drkostas](https://github.com/drkostas)! This is an amazing portfolio project and I am very thankful for his creation of the original project.

### Changelog:

+ added 2 new themes, Solar-ish Light and Solar-ish Dark. These are themes similar to the Solarized Light and a Dark version of the theme to fit the vibes I am going for with my portfolio.
+ added some custom tags in Index.jsx to better describe my skills
+ added an Articles section to the "Explorer" Tab, with functionality to post some kind of article/jupyter notebook coming soon

- removed extraneous stuff from drkostas's original project to keep the size of this smaller and learn what can/can't be removed from the project. This is still a work in progress and I plan to only have my own work on top of the original skeleton at some point to truly transform the project instead of just ripping it off and slapping my name on there


## Original README

## Environment Variables

For fetching your articles from dev.to, create an `.env.local` file inside the project directory. Check the `.env.local.example` file for more information.

## Running Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

All VSCode related components can be found in the `components` folder. To change the content of the portfolio, check out the `pages` folder. To add or remove pages, modify `components/Sidebar.jsx` and `components/Tabsbar.jsx`.

## Next.js Resources

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
