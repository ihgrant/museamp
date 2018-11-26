import React from 'react';
const { Menu } = require('electron').remote;

function Menus(props: { shuffle: boolean, toggleShuffle: () => void }) {
    const currentMenu = Menu.getApplicationMenu();

    // set up menu items
    let template = [
        {
            submenu: [{ role: 'quit' }]
        },
        {
            label: 'Playback',
            submenu: [
                {
                    label: 'Shuffle',
                    click: () => props.toggleShuffle(),
                    type: 'checkbox',
                    value: props.shuffle
                }
            ]
        }
    ];

    if (currentMenu.items.length !== template.length) {
        const menu = Menu.buildFromTemplate(template);
        Menu.setApplicationMenu(menu);
    } else {
        currentMenu.items[1].submenu.value = props.shuffle;
    }

    return null;
}

export default Menus;
