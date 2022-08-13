let global_state_scroller = false
let global_async_project_state = true
let lock_view = true
let state_view = 0
let value_view = 0

//ProjectLoader
  function ProjectLoader(){
    global_async_project_state = false
    fetch("https://serverless-fev-portfolio.vercel.app/user").then(response => response.json()).then(data => {
      console.log(data);
    })
  }
//ProjectLoader

//LOADER
  window.addEventListener('load', (e)=>{
    let loader = document.getElementById('loader')
    setTimeout((e)=>{
      loader.classList.add('loader_fx')
      setTimeout((e)=>{
        loader.remove()
        global_state_scroller = true
      },600)
    },600)
  })
//LOADER

//Scroll
// let menu_item = document.querySelectorAll('.menu_item')
// let count_board = document.getElementById('count_board')
window.addEventListener('wheel', function(event)
{
  if (global_state_scroller) {
    let main_view = document.getElementById('main_view')
   if (event.deltaY < 0)
   {
    if (lock_view) {
      lock_view = false

      setTimeout((e)=>{
        lock_view = true
      },1000)
      if (state_view != 0) {
        state_view -= 1
        value_view = state_view * 100
        main_view.style.transform = "translateY(-"+value_view+"vh)"
        let menu_item = document.querySelectorAll('.menu_item')
        for (var i = 0; i < menu_item.length; i++) {
          if (menu_item[i].classList.contains("color_fx_nav")) {
            menu_item[i].classList.remove('color_fx_nav')
          }
        }
        menu_item[state_view].classList.add('color_fx_nav')
        let count_board = document.getElementById('count_board')
        if (state_view == 0) {
          count_board.children[0].classList.add('count_first')
            for (var i = 0; i < count_board.children.length; i++) {
              if (count_board.children[i].classList.contains('color_count')) {
                count_board.children[i].classList.remove('color_count')
              }
              if (count_board.children[i].classList.contains('count_away')) {
                count_board.children[i].classList.remove('count_away')
              }
            }
        }
        if (state_view > 0) {
          for (var i = 0; i < count_board.children.length; i++) {
            if (count_board.children[i].classList.contains('count_away')) {
              count_board.children[i].classList.remove('count_away')
            }
          }
          count_board.children[state_view].classList.add('count_away')
        }
      }
    }
   }
   else if (event.deltaY > 0)
   {
    console.log('scrolling down');
    if (lock_view) {
      lock_view = false
      if (state_view == 1) {
        ProjectLoader()
      }


      setTimeout((e)=>{
        lock_view = true
      },1000)
      if (state_view != main_view.children.length - 1) {
        state_view += 1
        value_view = state_view * 100
        main_view.style.transform = "translateY(-"+value_view+"vh)"
        let menu_item = document.querySelectorAll('.menu_item')
        for (var i = 0; i < menu_item.length; i++) {
          if (menu_item[i].classList.contains("color_fx_nav")) {
            menu_item[i].classList.remove('color_fx_nav')
          }
        }
        menu_item[state_view].classList.add('color_fx_nav')
        let count_board = document.getElementById('count_board')
        if (state_view == 1) {
          count_board.children[0].classList.remove('count_first')
          for (var i = 0; i < count_board.children.length; i++) {
            if (!count_board.children[i].classList.contains('color_count')) {
              count_board.children[i].classList.add('color_count')
            }
          }
        }
        if (state_view >= 1) {
          for (var i = 1; i < count_board.children.length; i++) {
            if (count_board.children[i].classList.contains('count_away')) {
              count_board.children[i].classList.remove('count_away')
            }
          }
          count_board.children[state_view].classList.add('count_away')
        }
      }
    }
   }
  }
});
//Scroll

//Navigation
  let menu_item = document.querySelectorAll('.menu_item')
  let main_view = document.getElementById('main_view')
  let counter = document.querySelectorAll('.count_point')
  console.log(menu_item);
  for (var i = 0; i < menu_item.length; i++) {
    let nb = i
    menu_item[i].addEventListener('click', (e)=>{
      e.preventDefault()
      for (var y = 0; y < menu_item.length; y++) {
        if (menu_item[y].classList.contains('color_fx_nav')) {
          menu_item[y].classList.remove('color_fx_nav')
        }
      }
      menu_item[nb].classList.add('color_fx_nav')
      console.log(nb);
      state_view = nb
      let new_position = state_view * 100
      main_view.style.transform = "translateY(-"+new_position+"vh)"
      console.log(nb);
      console.log(counter);
      for (var u = 0; u < counter.length; u++) {
        if (nb > 0) {
          counter[0].classList.remove('count_first')
          if (!counter[u].classList.contains('color_count')) {
            counter[u].classList.add('color_count')
          }
        }
        if (u == nb) {
          for (var z = 1; z < counter.length; z++) {
            if (counter[z].classList.contains('count_away')) {
              counter[z].classList.remove('count_away')
            }
          }
          counter[nb].classList.add('count_away')
        }
        if (nb == 0) {
          counter[0].classList.add('count_first')
          for (var o = 0; o < counter.length; o++) {
            if (counter[o].classList.contains('color_count')) {
              counter[o].classList.remove('color_count')
            }
            if (counter[o].classList.contains('count_away')) {
              counter[o].classList.remove('count_away')
            }
          }
        }
      }

    })
  }
  function goTo(position){
    let main_view = document.getElementById('main_view')
    let menu_item = document.querySelectorAll('.count_point')
    let item = document.querySelectorAll('.menu_item')
    for (var f = 0; f < item.length; f++) {
      if (item[f].classList.contains('color_fx_nav')) {
        item[f].classList.remove('color_fx_nav')
      }
    }
    item[position].classList.add('color_fx_nav')
    if (position > 0) {
      menu_item[0].classList.remove('count_first')
      for (var i = 0; i < menu_item.length; i++) {
        if (!menu_item[i].classList.contains('color_count')) {
          menu_item[i].classList.add('color_count')
        }
      }
      menu_item[position].classList.add('count_away')
    }else {
      menu_item[0].classList.add('count_first')
      for (var i = 0; i < menu_item.length; i++) {
        if (menu_item[i].classList.contains('color_count')) {
          menu_item[i].classList.remove('color_count')
        }
        if (menu_item[i].classList.contains('count_away')) {
          menu_item[i].classList.remove('count_away')
        }
      }
    }
    let go_to = position * 100
    main_view.style.transform = "translateY(-"+go_to+"vh)"
  }
  document.getElementById('btn_project').addEventListener('click', (e)=>{
      state_view = 2
      goTo(2)
  })
  document.getElementById('logo').addEventListener('click', (e)=>{
      state_view = 0
      goTo(0)
  })

//Navigation

//Carrousel
    let carrousel_left = document.getElementById('carrousel_left')
    let carrousel_right = document.getElementById('carrousel_right')
    let project_sizer = document.getElementById('project_sizer')
    let cart_project = document.querySelectorAll('.cart_project')
    let state_carrousel = 0
    function SlideCarrousel(size_screen, state){
      let project_viewer = document.getElementById('project_viewer')
      let project_position = state * size_screen
      project_viewer.style.transform = "translateX(-"+project_position+"px)"
    }

    carrousel_right.addEventListener('click', ()=>{
      if (state_carrousel < cart_project.length - 1) {
        state_carrousel += 1
        SlideCarrousel(project_sizer.offsetWidth, state_carrousel)
      }
    })
    carrousel_left.addEventListener('click', ()=>{
      if (state_carrousel != 0) {
        state_carrousel -= 1
        SlideCarrousel(project_sizer.offsetWidth, state_carrousel)
      }
    })

//Carrousel


//Star Effect
let star_zone = document.getElementById('star_zone')
let grid_size_star = star_zone.children[0].offsetWidth
let nb_row = grid_size_star / 10
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
function GenerateStar(nb_row, where){
  let positon_element = getRandomInt(nb_row) * 10
  let star_element = document.createElement('div')
  star_element.classList.add('star_element')
  star_element.style.left = ""+positon_element+"px"
  let star_box = document.createElement('div')
  star_box.classList.add('star_box')
  star_box.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="darkorange" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>'
  star_element.appendChild(star_box)
  where.appendChild(star_element)
  setTimeout(()=>{
    star_element.classList.add('star_element_fx')
    star_box.classList.add('star_box_fx')
  }, 50)
  setTimeout(()=>{
    star_element.remove()
  }, 6000)
}
// GenerateStar(nb_row, star_zone.children[0])
  for (var i = 0; i < star_zone.children.length; i++) {
    let nb = i
    setInterval(()=>{
      GenerateStar(nb_row, star_zone.children[nb])
    },200)
  }
//Star Effect
