# **BlendDSL**

[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

## **Overview**

**BlendDSL** is a low-code platform that allows real-time transformation and synchronization between textual and graphical Domain-Specific Languages (DSLs). It provides a seamless Blended Modeling environment where users can switch between textual and graphical representations, ensuring that changes made in one are instantly reflected in the other.

The primary aim of this project is to bridge the gap between the complexity of textual DSLs, often more suitable for technical users, and the usability of graphical DSLs, which are better suited for non-technical users. By enabling two-way synchronization, **BlendDSL** empowers users to utilize the best of both worlds.

The project is built upon **React Flow** for graphical representation and allows generalization to various DSLs via JSON schema-based transformations.

---

## **Disclaimer**

The implementation of this project is based on my thesis, **"Implementation of a Mechanism for Automatic Transformation and Synchronization of Textual and Graphical Domain-Specific Languages"**, and is built on a closed platform, **Locsys**. You can explore the Locsys platform [here](https://locsys.issel.ee.auth.gr/), which I have also developed as part of my work.

Please note that the code in this repository is in an early stage of development. Future updates will include the final implementation of the synchronization mechanism, as well as the integration with my ongoing thesis progress. Contributions are encouraged, but keep in mind that some parts are still under development and may evolve.

---

## **Future Features**

- **Two-Way Synchronization:** Real-time updates between textual and graphical DSL representations.
- **Low-Code Development:** No coding required to manipulate DSLs, making it accessible for both developers and domain experts.
- **Blended Modeling Environment:** Combine textual power with graphical simplicity.
- **Flexible DSL Support:** Supports various DSLs, including **SmAuto** and others, through an easy-to-adapt JSON schema.
- **Extensibility:** New DSLs can be easily integrated into the system using JSON files that define both the textual and graphical models.

---

## **Installation**

To get started, follow these simple steps:

### **Prerequisites**
- **Node.js** (>=14.x.x) and **npm** (>=6.x.x) should be installed.
- **React** (>=17.x.x) for the graphical interface.
- A modern web browser.

### **Clone the Repository**

```bash
git clone https://github.com/chryskoum/BlendDSL.git
cd BlendDSL
```

### **Install Dependencies**

```bash
npm install
```

### **Start the Application**

```bash
npm run dev
```

This will launch the development server. You can now open `http://localhost:5173` in your web browser to view the graphical interface.

---

## **The Future Usage**

For now you can see how the graphical interface of Reactflow is in early stage.

Once the app is updated, will you can:

1. **Switch between Textual and Graphical Views:**  
   - Modify the DSL text and see immediate updates in the graphical interface.
   - Manipulate elements visually in the graphical interface, and the changes will reflect in the text.

2. **Add New DSL Models:**  
   - You can add new DSL definitions by creating JSON files that describe the transformation and synchronization logic between the textual and graphical models.

3. **Export Models:**  
   - Export the DSL models you create or modify in either textual or graphical formats.

---

## **Will be Supported the Below DSLs**

- **Robot DSL**: 
- **State Machine DSL**: For defining states and transitions.
- **SmAuto DSL**: A smart environment automation language.
- **GoalDSL**: A goal-driven approach to CPS.
- **dflow DSL**: In development

---

## **Roadmap**

- [ ] Integrate the final implementation from my thesis into this repository.
- [ ] Create a new UI/UX interface based on this [Figma Prototype](https://www.figma.com/proto/EVeo0L4qGX6TTeaARZ6SqV/Thesis?page-id=0%3A1&node-id=2-12&node-type=frame&viewport=492%2C353%2C0.15&t=TlOXUu637uUaEF6q-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=2%3A12).
- [ ] Extend support to more complex DSLs.
- [ ] Add more customization options for graphical representation.
- [ ] Expand testing and CI/CD pipeline.

---

## **License**

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for more details.

---

## **Contact**

If you have any questions or need further clarification, feel free to open an issue in the repository or reach out:

- **Author:** Chrysostomos Koumides
- **Email:** blendme.dsl@gmail.com
