const markdown = 
[{depth: 1, id: 0}, {depth:2, id:1}, {depth:3, id:2}, {depth:4, id:3}, {depth:3, id:4}, {depth:4,id:5}, {depth:2,id:6}, {depth:3,id:7}]
const getParent = (index) => {
  const i = index
  if (index === 0 ) {
    return obj
  } else {
    while(markdown[i].depth - 1 != markdown[index].depth) {
      index--
    }
    return markdown[index]
  }
}
getMarkdownTree = function (index, ele) {
  ele.children = ele.children || []
  if (index === markdown.length -1) {
    ele.children.unshift(markdown[index])
    return ele
  }
  if (markdown[index].depth === markdown[index + 1].depth) {
    ele.children.unshift(markdown[index])
    ele.children.unshift(getMarkdownTree(index + 1, ele))
  } else if (markdown[index].depth < markdown[index + 1].depth) {
    ele.children.unshift(getMarkdownTree(index + 1, markdown[index]))
  } else {
    ele.children.unshift(markdown[index])
    getMarkdownTree(index+1, getParent(index + 1))
  }
  return ele
}

const obj = {}
const res = getMarkdownTree(0, obj)
console.log(res)
