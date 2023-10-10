let slideIndex = 0;
        showSlides();

        function showSlides() {
            let i;
            const slides = document.getElementsByClassName("carousel-slide");

            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
            }

            slideIndex++;

            if (slideIndex > slides.length) {
                slideIndex = 1;
            }

            slides[slideIndex - 1].style.display = "block";
            setTimeout(showSlides, 4000); // Cambia la imagen cada 2 segundos
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }

        document.addEventListener("DOMContentLoaded",() => {
            const scrollToBottomButtom = document.getElementById('btn-ir-arriba');
            window.addEventListener("scroll",() => {
                if(window.scrollY > 250){
                    scrollToBottomButtom.style.display = 'block';
                }else{
                    scrollToBottomButtom.style.display = 'none';
                }
            })
            scrollToBottomButtom.addEventListener('click',() =>{
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                })
            })
        })