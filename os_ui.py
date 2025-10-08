import tkinter as tk
from tkinter import messagebox

def submit_form():
    os_name = entry_name.get()
    platforms = entry_platforms.get()
    kernel = var_kernel.get()
    security = entry_security.get()
    container = var_container.get()

    msg = f"""Submitted Info:
    OS Name: {os_name}
    Platforms: {platforms}
    Kernel Type: {kernel}
    Security Features: {security}
    Container Support: {container}
    """
    messagebox.showinfo("Form Submitted", msg)

# Main window
root = tk.Tk()
root.title("Multipurpose OS Design UI")
root.geometry("400x400")
root.config(bg="#f0f2f5")

# Header
tk.Label(root, text="Designing a Multipurpose OS", font=("Helvetica", 16, "bold"), bg="#f0f2f5").pack(pady=10)

# OS Name
tk.Label(root, text="OS Name:", bg="#f0f2f5").pack()
entry_name = tk.Entry(root, width=40)
entry_name.pack(pady=5)

# Target Platforms
tk.Label(root, text="Target Platforms (comma-separated):", bg="#f0f2f5").pack()
entry_platforms = tk.Entry(root, width=40)
entry_platforms.pack(pady=5)

# Kernel Type
tk.Label(root, text="Kernel Type:", bg="#f0f2f5").pack()
var_kernel = tk.StringVar(value="Hybrid")
kernel_options = ["Monolithic", "Microkernel", "Hybrid"]
tk.OptionMenu(root, var_kernel, *kernel_options).pack(pady=5)

# Security Features
tk.Label(root, text="Security Features (comma-separated):", bg="#f0f2f5").pack()
entry_security = tk.Entry(root, width=40)
entry_security.pack(pady=5)

# Container Support
tk.Label(root, text="Container Support:", bg="#f0f2f5").pack()
var_container = tk.StringVar(value="Docker")
container_options = ["Docker", "LXC", "None"]
tk.OptionMenu(root, var_container, *container_options).pack(pady=5)

# Submit Button
tk.Button(root, text="Submit", command=submit_form, bg="#4caf50", fg="white", width=20).pack(pady=20)

# Run the GUI
root.mainloop()
