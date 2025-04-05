let currentIndex = 0;
const images = [
    'image2.jpg',
];
const slideshow = document.getElementById('background-slideshow');

function changeBackground(index) {
    slideshow.style.backgroundImage = `url(${images[index]})`;
    currentIndex = index;
}

function nextBackground() {
    currentIndex = (currentIndex + 1) % images.length;
    changeBackground(currentIndex);
}

changeBackground(0);

setInterval(nextBackground, 5000);

const notificationContainer = document.getElementById('notification-container');
let downloadBtn;

function createNotificationCard(platform, title, desc, downloadLink, requirementsLink) {
    const card = document.createElement('div');
    card.className = 'card';
    card.id = `${platform}-notification`;

    const icon = document.createElement('div');
    icon.className = 'icon';
    icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <g id="SVGRepo_iconCarrier">
         <path stroke-linejoin="round" stroke-linecap="round" stroke-width="1.5" stroke="#ffffff" d="M20 14V17.5C20 20.5577 16 20.5 12 20.5C8 20.5 4 20.5577 4 17.5V14M12 15L12 3M12 15L8 11M12 15L16 11"></path>
    </g>
  </svg>`;

    const content = document.createElement('div');
    content.className = 'content';
    content.innerHTML = `<span class="title">${title}</span>
                      <div class="desc">${desc}</div>`;

    const actions = document.createElement('div');
    actions.className = 'actions';

    if (downloadLink) {
        actions.innerHTML += `<div><a href="${downloadLink}" class="download">Download Vinti Beta</a></div>`;
    }

    if (requirementsLink) {
        actions.innerHTML += `<div><a href="${requirementsLink}" class="notnow">To view requirements click here.</a></div>`;
    }

    const closeButtonContainer = document.createElement('a');
    closeButtonContainer.href = 'https://plingifyplug.com';
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'close';
    closeButton.innerHTML = `<svg aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
     </svg>`;

    closeButtonContainer.appendChild(closeButton);

    content.appendChild(actions);
    card.appendChild(icon);
    card.appendChild(content);
    card.appendChild(closeButtonContainer);
    return card;
}

function showPlatformNotification() {
    const userAgent = navigator.userAgent;
    let notification = null;
    let downloadLink = '';

    if (userAgent.indexOf('Windows') !== -1) {
        notification = createNotificationCard('windows', 'Windows Users', 'There is currently no available Beta version of Vinti.', null, 'https://plingifyplug.com');
    } else if (userAgent.indexOf('Mac') !== -1 && userAgent.indexOf('iPhone') === -1) {
        downloadLink = 'https://www.mediafire.com/file/1on79om0c0zbmjx/Vinti_MacOS_Beta.app.zip/file';
        notification = createNotificationCard('mac', 'Mac Users', 'Vinti MacOS Beta - MacOS BigSur 11.7.10+', downloadLink, 'https://plingifyplug.com');
    } else if (userAgent.indexOf('iPhone') !== -1) {
        notification = createNotificationCard('iphone', 'iPhone Users', 'This software is not available for download on iPhone.', null, 'https://plingifyplug.com');
    } else if (userAgent.indexOf('Android') !== -1) {
        notification = createNotificationCard('android', 'Android Users', 'This software is not available for download on Android.', null, 'https://plingifyplug.com');
    } else if (userAgent.indexOf('CrOS') !== -1) {
        notification = createNotificationCard('chromebook', 'Chromebook Users', 'This software is not available for download on Chromebooks.', null, 'https://plingifyplug.com');
    } else if (userAgent.indexOf('Linux') !== -1 && userAgent.indexOf('Android') === -1) {
        notification = createNotificationCard('linux', 'Linux Users', 'This software is not available for download on Linux.', null, 'https://plingifyplug.com');
    } else {
        notification = createNotificationCard('unknown', 'Unsupported Device', 'This software is not available on your device.', null, null);
    }

    notificationContainer.appendChild(notification);
    notification.classList.add('card-show');

    if (downloadLink !== "") {
        downloadBtn = document.querySelector('#windows-notification .download');
        downloadBtn.addEventListener('click', function(event) {
            event.preventDefault();
            window.location.href = downloadLink;
        });
    }
}

showPlatformNotification();

setTimeout(function () {
    showCookieNotice();
}, 1000);

function hasAcceptedCookies() {
    return document.cookie.split(';').some((item) => item.trim().startsWith('cookieAccepted='));
}

function showCookieNotice() {
    if (!hasAcceptedCookies()) {
        document.getElementById('cookie-card').style.display = 'block';
    }
}

function acceptCookies() {
    document.getElementById('cookie-card').style.display = 'none';
    document.cookie = 'cookieAccepted=true; max-age=31536000';
}

document.getElementById('accept-cookies').addEventListener('click', acceptCookies);

setTimeout(showCookieNotice, 1000);

document.cookie = "username=JohnDoe; path=/; secure; HttpOnly";
