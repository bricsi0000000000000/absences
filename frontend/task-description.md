Displaying Leave Times

    At the top of the page, users can choose the year and month (or months).

        Default: Current year and month.

    A list containing registered absence information is presented.

    Item attributes:

        Employee name (up to 100 characters).

        Starting date.

        Ending date.

        Reason (Holiday / Paid leave / Non-paid leave / Business Travel / Home office).

        Comment (free text, max. 500 characters).

            Only the initial 50 characters are visible; additional content is displayed in a "Tooltip" when hovering over the item.

            List items can be edited or deleted (using buttons/icons) if not yet approved.

            A new item can be added to the list with a "New" button.

    If a user adds a new item or edits an existing one, a div is displayed as a pop-up for attribute editing.

        The reason can be selected from a dropdown list.

        Starting/Ending dates can be selected.

             Client-side validation ensures the start date is less than or equal to the end date.

        A comment can be added as free text (not mandatory).

            Length validation: Max 500 characters.

    The user interface should be attractive, intuitive, and responsive.
    Technical requirements:

        Utilize Angular service (with Dependency Injection) with JSON to retrieve data (example: https://angular.io/tutorial/toh-pt4).

        Incorporate Angular components whenever possible.

        Implement SCSS for styling and use Flexbox for the layout (https://css-tricks.com/snippets/css/a-guide-to-flexbox/).

        Browser support: Chrome.