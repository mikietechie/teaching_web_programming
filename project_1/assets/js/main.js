document.addEventListener("DOMContentLoaded", () => {
  const todos = []
  const $form = document.querySelector("form")
  const $list = document.querySelector("ul")
  const $desc = $form.querySelector("input")

  const renderList = () => {
    console.log(todos);
    $list.innerHTML = `
    ${todos.map(item => `<li class="${item.done ? 'done' : 'pending'}" id="${item.id}">
      <p class="desc">${item.desc}</p>
      <p class="timestamp">${item.timestamp.toLocaleString()}</p>
    </li>`).join("")}
    `
    registerUpdateHandler()
  }
  
  const registerUpdateHandler = () => {
    $list.querySelectorAll("li").forEach($li => {
      $li.addEventListener("click", () => {
        todos.forEach(item => {
          if (item.id === $li.id) {
            item.done = !item.done
          }
        })
        renderList()
      })
    })
  }

  $form.addEventListener("submit", (e) => {
    e.preventDefault()
    const date = new Date()
    todos.push({
      desc: $desc.value,
      timestamp: date,
      done: false,
      id: (date.getTime() + Math.random()).toString()
    })
    renderList()
    $desc.value = ""
    return false
  })
})