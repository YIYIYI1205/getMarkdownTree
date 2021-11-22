# 根据深度depth转化为树结构
- 将marked中require('marked').lexer(markdown)文本根据深度depth转化为树结构
- input  
  [  
  &emsp;{depth: 1, id: 0},   
  &emsp;{depth:2, id:1},   
  &emsp;{depth:3, id:2},  
  &emsp;{depth:4, id:3},   
  &emsp;{depth:3, id:4},   
  &emsp;{depth:4,id:5},   
  &emsp;{depth:2,id:6},  
  &emsp;{depth:3,id:7}  
]
- expect  
    [  
  &emsp;{depth: 1, id: 0, children: [  
    &emsp;&emsp;{depth:2, id:1, children: [  
      &emsp;&emsp;&emsp;{depth:3, id:2,   children: [  
        &emsp;&emsp;&emsp;&emsp;{depth:4, id:3}   
      &emsp;&emsp;&emsp;]},  
      &emsp;&emsp;&emsp;{depth:3, id:4,   children: [  
        &emsp;&emsp;&emsp;&emsp;{depth:4,id:5}  
      &emsp;&emsp;&emsp;]}  
    &emsp;&emsp;]},   
    &emsp;&emsp;{depth:2,id:6, children: [  
      &emsp;&emsp;&emsp;{depth:3,id:7}  
    &emsp;&emsp;]},   
  &emsp;]}  
]
- 思路：递归
- getMarkdownTree(index, ele):index表示当前递归的元素索引，ele表示当前元素应该添加给哪一个元素作为children
- 判断：  
  1.当前元素<后一个元素，说明下一个元素是当前元素的子元素：ele.children.push(递归(后一个, 当前元素))  
  2. 当前元素=后一个元素，说明当前元素已无子元素：ele.children.push(当前元素)；ele.children.push(递归(后一个, ele))
  3. 当前元素>后一个元素，说明当前元素已无子元素，并且要递归下一个值，找到下一个值的父元素：ele.children.push(当前元素);递归(下一个元素，下一个元素的父元素)  
  4. 特殊处理最后一个元素递归   
- 按上述思路出来的结果由于第3步，会导致逆序，因此将push改为unshift