// ==UserScript==
// @name         Local TXT Reader
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Enhanced reading experience for local txt files
// @author       JiuYou2020
// @match        file:///*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Ensure the script runs only on .txt files
    if (window.location.pathname.endsWith('.txt')) {
        // Set up styles
        const style = document.createElement('style');
        style.innerHTML = `
            body {
                background-color: #e7e3d8; /* Background color for the empty regions */
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                overflow: hidden;
            }

            .content {
                width: 60%; /* Center content, leaving 20% on each side */
                background-color: #f4f1e9; /* Background color for the content area */
                padding: 20px;
                box-shadow: 0 0 10px rgba(0,0,0,0.1);
                overflow-y: auto;
                height: 90vh;
                color: #333333; /* Font color for the content */
                font-size: 19px;
                line-height: 1.5;
                font-family: inherit;
            }

            .content p {
                text-indent: 2em;
                margin-top: 1em; /* Add space between paragraphs */
            }
        `;
        document.head.appendChild(style);

        // Get the text content
        const text = document.body.textContent.trim();

        // Split the text into paragraphs by newlines
        const paragraphs = text.split(/\n+/).map(paragraph => paragraph.trim());

        // Clear the body content
        document.body.innerHTML = '';

        // Create a container for the content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'content';
        document.body.appendChild(contentDiv);

        // Add paragraphs to the content div
        paragraphs.forEach(paragraph => {
            if (paragraph) { // Only add non-empty paragraphs
                const p = document.createElement('p');
                p.textContent = paragraph;
                contentDiv.appendChild(p);
            }
        });
    }
})();
