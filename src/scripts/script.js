let slideIndex = 1;
        showSlides();

        function showSlides() {
            let i;
            const slides = document.getElementsByClassName("carousel-slide");

            for (i = 0; i < slides.length; i++) {
                slides[i].style.display = "none";
                
            }

            if (slideIndex > slides.length) {
                slideIndex = 1;
            }

            slides[slideIndex - 1].style.display = "block";
            
        }

        function plusSlides(n) {
            showSlides(slideIndex += n);
        }