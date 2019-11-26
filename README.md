# parseQueryUrl.js

对非hash路由：为了防止误会：url所带参数中不要有：# , 因为location.hash是以#开始的。而且url中参数（？）和 hash（#）是有顺序的：先是 ？，后是 #
对hash路由，# 后面 ？有效
有三种情况：
    1. http://localhost:3003/manager?ctype=ykt#/teachercourselist?xxx=one
    2. http://localhost:3003/manager#/teachercourselist?xxx=one
    3. http://localhost:3003/manager?ctype=ykt#/teachercourselist