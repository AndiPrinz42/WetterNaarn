Date.prototype.addDays = function (days) {
    this.setDate(this.getDate() + parseInt(days));
    return this;
};

function getCookie(name) {
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[name];
}

function setCookie(name, content, expires, path) {
    document.cookie = name + "=" + content + "; expires=" + expires + "; path=" + path;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const COOKIE_BG = document.getElementById("cookie-background");
const COOKIE_BANNER = document.getElementById("cookie-banner");
const COOKIE_CONSENT = document.getElementById("cookie-consent");
const COOKIE_SETTINGS = document.getElementById("cookie-settings");
const COOKIE_BTN_ACCEPT = document.getElementById("accept");
const COOKIE_BTN_SETTINGS = document.getElementById("settings");
const COOKIE_BTN_SETTINGS_BACK = document.getElementById("back");
const COOKIE_BTN_SETTINGS_SAVE = document.getElementById("save");

const ANALYTICS_SETTING_SLIDER = document.getElementById("analytics");


const consent = {
    visible: undefined,
    preferences: ['analytics'],
    accepted: undefined,

    init: function () {
        if (!this.exists()) {
            this.new();
        }
        this.get();
        this.updateVisibility();
    },

    new: function () {
        this.visible = true;
        this.accepted = [false];
        this.set();
    },

    set: function () {
        this.accepted.unshift(this.visible);
        setCookie("consent", JSON.stringify(this.accepted), new Date().addDays(365), "/");
        this.accepted.shift();
    },

    get: function () {
        let cookie = JSON.parse(getCookie("consent"));
        this.visible = cookie[0];
        cookie.shift();
        this.accepted = cookie;
    },

    updateVisibility: async function () {
        if (this.visible) {
            COOKIE_BG.classList.add("visible");
            COOKIE_BANNER.classList.add("visible");
            COOKIE_BANNER.classList.remove("hidden");
            document.body.style.overflow = "hidden";
        } else {
            COOKIE_BG.classList.remove("visible");
            COOKIE_BANNER.classList.remove("visible");
            COOKIE_BANNER.classList.add("hidden");
            document.body.style.overflow = "auto";
        }
    },

    show: function (visible) {
        this.visible = visible;
        this.set();
        this.updateVisibility();
    },


    exists: function () {
        return document.cookie.indexOf("consent=") ? false : true;
    },

    // set and get cookie preferences   
    acceptAll: function () {
        this.accepted = this.preferences.map(function () {
            return true;
        });
        this.set();
    },

    setAnalytics: function (accepted) {
        this.accepted[this.preferences.indexOf("analytics")] = accepted;
        this.set();
    },
};

COOKIE_BTN_ACCEPT.addEventListener("click", async function () {
    consent.acceptAll();
    consent.show(false);
    await delay(800);
    location.reload();
});

COOKIE_BTN_SETTINGS.addEventListener("click", function () {
    COOKIE_CONSENT.style.display = "none";
    COOKIE_SETTINGS.style.display = "block";
});

COOKIE_BTN_SETTINGS_BACK.addEventListener("click", function () {
    COOKIE_CONSENT.style.display = "block";
    COOKIE_SETTINGS.style.display = "none";
});


COOKIE_BTN_SETTINGS_SAVE.addEventListener("click", async function () {
    consent.show(false);
    consent.setAnalytics(ANALYTICS_SETTING_SLIDER.checked);
    await delay(800);
    location.reload();
});

setTimeout(() => {
    consent.init();
}, 1000);