const controller = {
    init (events) {
        this.events = events;
        this.cacheDOM();
        this.renderUIComponents();
        this.container.classList.add("app__loaded");
        this.bindClickEvents();
        this.currentIndex = 0;
        this.events.on("page-change", (page) => {
            this.currentIndex = Number(page.index);

            //handle top nav buttons
            this.topNavButtons.forEach((button, i) => {
                button.classList.add("active");
                if (i > page.index) {
                    button.classList.remove("active");
                }
            });
            this.topNav.querySelector(`[data-page-id="${page.index}"]`).classList.add("active");

            //handle pages
            this.formPages.forEach((formPage) => {
                this.activatePage(formPage);
            });
            this.formPages[ page.index ].nodeList.forEach((nodeList) => {
                nodeList.classList.add("active");
            });

            //handle bottom
            if (page.index !== 2) {
                this.bottomNav.classList.add("active");
            } else {
                this.bottomNav.classList.remove("active");
            }

            if (page.index === 0) {
                this.bottomNavButtons[ 0 ].classList.add("disabled");
            } else {
                this.bottomNavButtons[ 0 ].classList.remove("disabled");
            }
        });

        //make the first page active
        this.events.emit("page-change", { index: 0 });
    },
    activatePage (formPage) {
        formPage.nodeList.forEach((nodeList) => {
            nodeList.classList.remove("active");
        });
    },
    toArray (nodeList) {
        return [].slice.call(nodeList);
    },
    bindClickEvents () {
        this.topNavButtons = this.toArray(this.topNav.querySelectorAll(".app__button"));
        this.topNavButtons.forEach((item) => {
            item.addEventListener("click", (e) => {
                const id = e.currentTarget.dataset.pageId;

                this.events.emit("page-change", { index: Number(id) });
            });
        });
        this.bottomNavButtons = this.toArray(this.bottomNav.querySelectorAll(".app__button"));
        this.bottomNavButtons.forEach((button) => {
            button.addEventListener("click", (e) => {
                const label = e.currentTarget.dataset.label;

                if (this.currentIndex !== 2) {
                    if (label === "prev") {
                        this.events.emit("page-change", { index: this.currentIndex - 1 });
                    } else if (label === "next") {
                        this.events.emit("page-change", { index: this.currentIndex + 1 });
                    }
                }
            });
        });
    },
    cacheDOM () {
        this.container = document.querySelector("#centerContentWrap");
        this.formPages = [
            { nodeList: this.toArray(this.container.querySelectorAll("#donation1")) },
            { nodeList: this.toArray(this.container.querySelectorAll(".tributeSection, #donation2 > div.donateSlide > div > div.donationSection > div:nth-child(-n+6)")) },
            { nodeList: this.toArray(this.container.querySelectorAll("#donation2 > div.donateSlide > div > div.donationSection > div.donationSection.noBorderBot.noPaddingBot.toggleMargin, #donation3, .donateBtnCont")) }
        ];
        this.topNav = this.buildTopNav();
        this.bottomNav = this.buildBottomNav();
    },
    buildTopNav () {
        const labels = {
            page1: "Amount",
            page2: "Name",
            page3: "Payment",
            message: "DONATE TODAY"
        };

        return this.createDiv("top-nav-wrapper", `

            <div class="app__nav-top nav">
                <h3>${labels.message}</h3>
                <div class="app__ui-wrapper">
                    <div class="app__button" data-page-id="0">
                        <div class="label">${labels.page1}</div>
                        <div class="number">1</div>
                    </div>
                    <div class="app__button" data-page-id="1">
                        <div class="label">${labels.page2}</div>
                        <div class="number">2</div>
                    </div>
                    <div class="app__button" data-page-id="2">
                        <div class="label">${labels.page3}</div>
                        <div class="number">3</div>
                    </div>
                </div>
            </div>`);
    },
    buildBottomNav () {
        const labels = {
            button1: "Previous",
            button2: "Next"
        };

        return this.createDiv("bottom-nav-wrapper", `
            <div class="app__nav-bottom nav">
                <div class="app__ui-wrapper">
                    <div class="app__button" data-label="prev">${labels.button1}</div>
                    <div class="app__button" data-label="next">${labels.button2}</div>
                </div>
            </div>
        `);
    },
    createDiv (classNames, html) {
        const div = document.createElement("div");

        div.classList.add("app__injected-ui");
        div.classList.add(classNames);
        div.innerHTML = html;

        return div;
    },
    renderUIComponents () {
        this.renderDiv("#centerContentWrap", this.topNav);
        this.renderDiv("#centerContentWrap", this.bottomNav);
    },
    renderDiv (target, node) {
        const injectPoint = document.querySelector(target);

        injectPoint.appendChild(node);
    },
    makeActivePage (page) {
        page.classList.add("form-page__active");
    }
};

export default controller;