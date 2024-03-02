# Notes on the Project's Structure

These are just some notes on how the project works so I can understand the flow of the program better for making changes to the project

For Article and Project Cards, the metadata used for each post is the json file (python-projects, articles, tech-projects)

- Add Metadata here instead of within notebooks you want to convert

Articles Page:

- List of all articles you have published
- Unlike Projects, cards should be clickable to lead to a post page (change projects later too maybe?)

Projects and Articles Page need a filter button

Clicking a Tag on the homepage takes you to a page that is NOT Articles or Projects, it instead goes to a custom page with the format:

Filter(This can be used to add more tags or take them away)

---Projects(If Any)---

<center>
projCard1 | projCard2 | projCard3 ...
</center>

---Articles(If Any)---

<center>
articleCard1 | articleCard2 | articleCard3 ...
</center>

## TODOS

Articles need...

- Articles.jsx Page with Article Cards displaying each post -> DONE
- Article Cards are abstracted to a component -> DONE
- Filter button to add/remove tags
  - No tags returns a blank page with some kind of "Nothing Found, try selecting a tag" message
- ArticlesPage.module.css to style the page -> DONE
- ArticlesCard.module.css to style the cards -> DONE
- Some kind of routing to Articles/[Article-Name].jsx -> DONE
- This routed page displays the article
- Article.module.css for the article's CSS

Project Page needs...

- Filter Button to add/remove tags
  - No tags returns a blank page with some kind of "Nothing Found, try selecting a tag" message
- Can this be done and still render the pages statically?

Clicking Tags on the Homepage needs...

- Custom Article + Project Page that displays project and article cards -> DONE
- Filter button to add more tags/remove tags