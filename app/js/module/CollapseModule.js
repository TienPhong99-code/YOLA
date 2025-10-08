export default function CollapseModule() {
  const clBlock = document.querySelectorAll(".collapse-block");
  if (clBlock) {
    clBlock.forEach((item) => {
      const clBody = item.querySelectorAll(".collapse-body");
      const clItems = item.querySelectorAll(".collapse-item");

      if (clBody) {
        $(clBody[0]).slideDown();
        clBody[0].parentElement.classList.add("active");
      }

      clItems.forEach((item) => {
        if (item.classList.contains("active")) {
          const body = item.querySelector(".collapse-body");
          $(body).slideDown();
        }
      });

      const head = item.querySelectorAll(".collapse-head");

      head.forEach((item) => {
        item.addEventListener("click", () => {
          const parentItem = item.parentElement;
          const body = parentItem.querySelector(".collapse-body");

          if (parentItem.classList.contains("active")) {
            // If the clicked item is already active, collapse it
            $(body).slideUp();
            parentItem.classList.remove("active");
          } else {
            // Otherwise, expand only this item without collapsing others
            $(body).slideDown();
            parentItem.classList.add("active");
          }
        });
      });
    });
  }

  const clSmall = document.querySelectorAll(".cl-small");
  if (clSmall) {
    clSmall.forEach((item) => {
      const clBody = item.querySelectorAll(".cl-bodies");
      const clItems = item.querySelectorAll(".cl-items");

      if (clBody) {
        $(clBody[0]).slideDown();
        clBody[0].parentElement.classList.add("active");
      }

      clItems.forEach((item) => {
        if (item.classList.contains("active")) {
          const body = item.querySelector(".cl-bodies");
          $(body).slideDown();
        }
      });

      const head = item.querySelectorAll(".cl-heads");

      head.forEach((item) => {
        item.addEventListener("click", () => {
          const parentItem = item.parentElement;
          const body = parentItem.querySelector(".cl-bodies");

          if (parentItem.classList.contains("active")) {
            $(body).slideUp();
            parentItem.classList.remove("active");
          } else {
            $(body).slideDown();
            parentItem.classList.add("active");
          }
        });
      });
    });
  }
}
