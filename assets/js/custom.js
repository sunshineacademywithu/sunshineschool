// Код для відправки форми в Telegram
const forms = document.querySelectorAll('.form');

forms.forEach((form) => {
  form.addEventListener('submit', async function(e) {
    e.preventDefault();

    let communicationType = "Не обрано";

    const radioCall = form.querySelector('[name="communication"][value="call"]');
    const radioMessage = form.querySelector('[name="communication"][value="message"]');

    if (radioCall && radioCall.checked) {
      communicationType = "📞 Зателефонуйте мені";
    } else if (radioMessage && radioMessage.checked) {
      communicationType = "💬 Напишіть мені в месенджер";
    }

    const phone = form.querySelector('[name="phone"]')?.value.trim() || '';

    if (!phone) {
        alert('Вкажіть номер телефону.');
        return;
    }

    const privacyConsent = form.querySelector('[name="privacyConsent"]')?.checked || false;

if (!privacyConsent) {
  alert('Підтвердіть згоду з політикою конфіденційності.');
  return;
}

    const formData = {
      name: form.querySelector('[name="name"]')?.value.trim() || '',
      email: form.querySelector('[name="email"]')?.value.trim() || '',
      phone: phone,
      serviceIndividual: form.querySelector('[name="serviceIndividual"]')?.checked || false,
      serviceGroup: form.querySelector('[name="serviceGroup"]')?.checked || false,
      serviceConsultation: form.querySelector('[name="serviceConsultation"]')?.checked || false,
      communication: communicationType,
      comment: form.querySelector('[name="comment"]')?.value.trim() || '',
      privacyConsent: privacyConsent,
    };

    const CLOUDFLARE_URL = 'https://holy-boat-68f3.sunshineschoolwithu.workers.dev/';

    try {
      const response = await fetch(CLOUDFLARE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        alert('Дякуємо! Заявку успішно надіслано.');
        form.reset();
      } else {
        alert('Помилка відправлення.');
        console.log(data);
      }
    } catch (error) {
      console.error('Помилка:', error);
      alert('Не вдалося надіслати.');
    }
  });

});




  
// Форма для вибору інтенсивності і графіку 
  document.addEventListener("DOMContentLoaded", () => {

    const daysByIntensity = {
        twotimes: [
            "Понеділок і середа",
            "Вівторок і четвер",
            "Середа і п'ятниця",
            "Четвер і субота",
            "П'ятниця і неділя"
        ],
        threetimes: [
            "Понеділок, середа, пʼятниця",
            "Вівторок, четвер, субота",
            "Середа, п'ятниця, неділя"
        ]
    };

    const hoursByDays = {
        "Понеділок і середа": ["10:00-12:00", "14:00-16:00", "18:00-20:00", "20:00-22:00"],
        "Вівторок і четвер": ["10:00-12:00", "14:00-16:00", "18:00-20:00", "20:00-22:00"],
        "Середа і п'ятниця": ["10:00-12:00", "14:00-16:00", "18:00-20:00", "20:00-22:00"],
        "Четвер і субота": ["10:00-12:00", "14:00-16:00", "18:00-20:00", "20:00-22:00"],
        "П'ятниця і неділя": ["10:00-12:00", "14:00-16:00", "18:00-20:00", "20:00-22:00"],

        "Понеділок, середа, пʼятниця": ["10:00-12:00", "14:00-16:00", "18:00-20:00", "20:00-22:00"],
        "Вівторок, четвер, субота": ["10:00-12:00", "14:00-16:00", "18:00-20:00", "20:00-22:00"],
        "Середа, п'ятниця, неділя": ["10:00-12:00", "14:00-16:00", "18:00-20:00", "20:00-22:00"]
    };

    const intensity = document.getElementById("intensity");
    const day = document.getElementById("day");
    const hour = document.getElementById("hour");

    // відкриття dropdown
    document.querySelectorAll(".option").forEach(select => {

        const title = select.querySelector(".option-title, .selected");

        title.addEventListener("click", (e) => {

            if (select.classList.contains("disabled")) return;

            document.querySelectorAll(".option").forEach(item => {
                if (item !== select) {
                    item.classList.remove("active");
                }
            });

            select.classList.toggle("active");
            e.stopPropagation();
        });
    });

    document.addEventListener("click", () => {
        document.querySelectorAll(".option").forEach(select => {
            select.classList.remove("active");
        });
    });

    // вибір інтенсивності
    intensity.querySelectorAll("li").forEach(item => {

        item.addEventListener("click", () => {

            const value = item.dataset.value;

            intensity.querySelector(".option-title").textContent =
                item.textContent;

            intensity.classList.remove("active");

            day.classList.remove("disabled");

            day.querySelector(".selected").textContent =
                "Оберіть дні проведення занять";

            day.querySelector(".dropdown-1").innerHTML = "";

            hour.querySelector(".selected").textContent =
                "Спочатку оберіть дні";

            hour.querySelector(".dropdown-1").innerHTML = "";

            hour.classList.add("disabled");

            daysByIntensity[value].forEach(dayName => {

                const li = document.createElement("li");

                li.textContent = dayName;
                li.classList.add("options");

                li.addEventListener("click", () => {

                    day.querySelector(".selected").textContent =
                        dayName;

                    day.classList.remove("active");

                    hour.classList.remove("disabled");

                    hour.querySelector(".selected").textContent =
                        "Оберіть годину";

                    hour.querySelector(".dropdown-1").innerHTML = "";

                    hoursByDays[dayName].forEach(hourValue => {

                        const hourLi = document.createElement("li");

                        hourLi.textContent = hourValue;
                        hourLi.classList.add("options");

                        hourLi.addEventListener("click", () => {

                            hour.querySelector(".selected").textContent =
                                hourValue;

                            hour.classList.remove("active");
                        });

                        hour.querySelector(".dropdown-1")
                            .appendChild(hourLi);
                    });
                });

                day.querySelector(".dropdown-1")
                    .appendChild(li);
            });
        });
    });

});

 // const intensitySelect = document.querySelector("#intensity");
 // const daySelect = document.querySelector("#day");
 // const hourSelect = document.querySelector("#hour");

 // if (!intensitySelect || !daySelect || !hourSelect) {
 //   return;
 // }

 // function resetSelect(select, placeholder) {
 //   select.innerHTML = "";
 //   select.disabled = true;

   // const option = document.createElement("option");
   // option.value = "";
   // option.textContent = placeholder;
   // select.appendChild(option);
 // }

 // function fillSelect(select, placeholder, options) {
  //  select.innerHTML = "";
  ///  select.disabled = false;

   // const placeholderOption = document.createElement("option");
   // placeholderOption.value = "";
   // placeholderOption.textContent = placeholder;
   // select.appendChild(placeholderOption);

   // options.forEach(function (item) {
    //  const option = document.createElement("option");
    //  option.value = item;
    //  option.textContent = item;
    //  select.appendChild(option);
   // });
 // }

 // resetSelect(daySelect, "Спочатку оберіть інтенсивність");
 // resetSelect(hourSelect, "Спочатку оберіть дні");

 // intensitySelect.addEventListener("change", function () {
  //  const selectedIntensity = intensitySelect.value;
  //  const dayOptions = daysByIntensity[selectedIntensity] || [];

  //  resetSelect(hourSelect, "Спочатку оберіть дні");

   // if (!dayOptions.length) {
    //  resetSelect(daySelect, "Спочатку оберіть інтенсивність");
     // return;
    //}

   // fillSelect(daySelect, "Оберіть дні", dayOptions);
  //});

  //daySelect.addEventListener("change", function () {
    //const selectedDays = daySelect.value;
    //const hourOptions = hoursByDays[selectedDays] || [];

    //if (!hourOptions.length) {
     // resetSelect(hourSelect, "Спочатку оберіть дні");
     // return;
   // }

    //fillSelect(hourSelect, "Оберіть годину", hourOptions);
 // });

