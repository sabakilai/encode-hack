# UPF Checker

See the demo **[here](https://www.youtube.com/watch?v=5Okp_ycsaE0)**!

👋 This is UPF Checker - the AI companion on a mission to help you identify and reduce your consumption of Ultra-Processed Foods. 

- The UPF Checker is a progressive web application that helps the user to identify the ultra-processed food and reduce its consumption by transforming the user selfie inducing the emotional response.  

- Under the hood, the UPF Checker uses three models: the Optical Character Recognition model that extracts ingredients as text, the ChatGPT that identifies the food category based on extracted text using the zero-shot learning, and the Stability AI image-to-image model that user selfie using the conditional parameters based on the identified category. 

## Why it matters

In the new "age of eating", most of our calories come from an entirely novel set of substances: Ultra-Processed Foods (UPFs). These industrially processed marvels are designed to be irresistible and easy to overindulge in, leading to not-so-fun consequences like addiction and overconsumption. UPFs are everywhere, from your favourite ready-to-eat meals to those snack packs you can't put down, packed with sugars, salts, unhealthy fats, and additives. But why does this matter? Recent studies have linked UPFs to a host of health issues, including obesity, cardiovascular diseases, and even some cancers. Yikes! 

UPFs account for a significant portion of the total dietary energy consumed in many countries. In high-income nations like the UK, Canada, and the USA, they make up more than half of the total dietary intake. Even in middle-income countries such as Brazil, Mexico, and Chile, ultra-processed foods contribute between one-fifth and one-third of the total dietary energy.

However, until now, there has been no simple method to identify these products easily.

The UPF Checker addresses this issue by providing a straightforward way for users to recognize ultra-processed foods. It aims to help policymakers prevent potential health crises by raising awareness about the harmful effects of ultra-processed foods. The UPF Checker achieves this through an engaging and entertaining approach, making the identification process more accessible and appealing to users.

## Project structure 

- Research folder contains scripts with model training experiments we conducted and used to select our best final models that can found in the backend folder. 
- Our backend is built using the Flask Python web framework. It has a sigle endpoint for our client to post requests.
- Our frontend is a progressive web application built using the Next JS. It utilises the IndexedDB to store our user photo locally on the user device. Tailwind is used for the design. 

## Meet the team

👩‍🏫 **Emeli Dral** - Machine Learning expert

<img width="998" alt="Screenshot 2024-03-10 at 10 09 18" src="https://github.com/sabakilai/encode-hack/assets/22995068/21a688c3-a2ee-45e8-b81c-2b0e904f08cf">

👨‍💻 **Dima Dem** - Frontend Developer

<img width="998" alt="Screenshot 2024-03-10 at 10 09 30" src="https://github.com/sabakilai/encode-hack/assets/22995068/42422388-6da7-46ec-acfc-34d937a41fa1">

👨‍💻 **Bakhtiiar Bakhautdinov** - Backend Developer

<img width="998" alt="Screenshot 2024-03-10 at 10 09 40" src="https://github.com/sabakilai/encode-hack/assets/22995068/63d9ba8d-dc0c-4d04-b637-750b16889f19">

👩‍💻 **Kate Usacova** - Fullstack Developer

<img width="998" alt="Screenshot 2024-03-10 at 10 09 49" src="https://github.com/sabakilai/encode-hack/assets/22995068/baf2416c-aa98-47cf-a424-6f140e284609">

## Try it out!
<img width="300" alt="QR" src="https://github.com/sabakilai/encode-hack/assets/22995068/96dff556-603b-47a0-b661-a4126620e0eb">
