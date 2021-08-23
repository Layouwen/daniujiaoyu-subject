// ==UserScript==
// @name         大牛教育忽略某学科
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://os.daniujiaoyu.org/html/member/subject
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

// 加载 jquery
const jqScript = document.createElement('script')
jqScript.src = 'https://cdn.bootcdn.net/ajax/libs/jquery/3.6.0/jquery.min.js'
document.body.appendChild(jqScript)

$(function () {
  // 删除遮罩
  const ad = $('.del-Popout')
  ad.each((index, el) => el.remove())

  setTimeout(() => main(), 800)
})

const main = () => {
  const style = document.createElement('style')
  let styleContent = `
.tools-wrapper {
  font-size: 16px;
}
.tools-wrapper .subjectItem {
  margin-right: 30px;
}
`
  style.innerHTML = styleContent
  document.head.appendChild(style)

  const $subjectLei = $('.subjectLei')
  const $subjects = $('.subjectLei2Item')
  const subjectData = JSON.parse(window.localStorage.getItem('subjects') || '[]')

  if (subjectData.length === 0) {
    $subjects.each((index, el) => {
      subjectData.push({
        id: index,
        status: false,
        value: el.innerText,
      })
    })
  }

  let toolsHTML = `<div class="tools-wrapper">`
  subjectData.forEach(subject => {
    toolsHTML += `<label class="subjectItem"><input type="checkbox" value="${subject.value}" ${
      subject.status ? 'checked' : ''
    }/>${subject.value}</label>`
  })
  toolsHTML += '</div>'

  $subjectLei.prepend(toolsHTML)

  render()

  const $tools = $('.tools-wrapper')
  $tools.on('click', e => {
    const target = e.target
    if (target.nodeName === 'INPUT') {
      const subject = subjectData.find(sub => sub.value === target.value)
      subject.status = !subject.status
      render()
      window.localStorage.setItem('subjects', JSON.stringify(subjectData))
    }
  })

  function render() {
    $subjects.each((index, el) => {
      const isShow = subjectData.find(sub => sub.value === el.innerText).status
      if (isShow) {
        el.style.display = 'none'
      } else {
        el.style.display = 'inline-block'
      }
    })
  }
}
