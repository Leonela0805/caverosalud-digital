// JavaScript para la funcionalidad de CaveroSalud Digital
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const heroRegisterBtn = document.getElementById('heroRegisterBtn');
    const loginModal = document.getElementById('loginModal');
    const registerModal = document.getElementById('registerModal');
    const closeModalButtons = document.querySelectorAll('.close-modal');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const dashboard = document.getElementById('dashboard');
    const logoutBtn = document.getElementById('logoutBtn');
    const newAppointmentBtn = document.getElementById('newAppointmentBtn');
    const appointmentsList = document.getElementById('appointmentsList');
    const userName = document.getElementById('userName');
    const userEmail = document.getElementById('userEmail');
    const userAvatar = document.getElementById('userAvatar');

    // Datos de ejemplo
    let users = JSON.parse(localStorage.getItem('caverosalud_users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('caverosalud_currentUser')) || null;
    let appointments = JSON.parse(localStorage.getItem('caverosalud_appointments')) || [];
    
    // Datos de médicos y especialidades
    const specialties = [
        { id: 1, name: 'Medicina General', icon: '👨‍⚕️' },
        { id: 2, name: 'Pediatría', icon: '👶' },
        { id: 3, name: 'Cardiología', icon: '❤️' },
        { id: 4, name: 'Dermatología', icon: '🔬' },
        { id: 5, name: 'Ginecología', icon: '🌸' },
        { id: 6, name: 'Oftalmología', icon: '👁️' }
    ];

    const doctors = [
        { id: 1, name: 'Dr. Juan Pérez', specialty: 'Medicina General', avatar: 'JP' },
        { id: 2, name: 'Dra. María García', specialty: 'Pediatría', avatar: 'MG' },
        { id: 3, name: 'Dr. Carlos López', specialty: 'Cardiología', avatar: 'CL' },
        { id: 4, name: 'Dra. Ana Martínez', specialty: 'Dermatología', avatar: 'AM' },
        { id: 5, name: 'Dra. Laura Rodríguez', specialty: 'Ginecología', avatar: 'LR' },
        { id: 6, name: 'Dr. Luis Fernández', specialty: 'Oftalmología', avatar: 'LF' }
    ];

    // Inicializar la página
    function initPage() {
        if (currentUser) {
            showDashboard();
        }
        
        // Cargar datos de ejemplo si no existen
        if (users.length === 0) {
            loadSampleData();
        }
    }

    // Cargar datos de ejemplo
    function loadSampleData() {
        // Usuario de ejemplo
        const sampleUser = {
            id: 1,
            name: 'Carlos Contreras',
            dni: '12345678',
            email: 'carlos@ejemplo.com',
            phone: '966123456',
            password: 'password123',
            avatar: 'C'
        };
        
        users.push(sampleUser);
        localStorage.setItem('caverosalud_users', JSON.stringify(users));
        
        // Citas de ejemplo
        const sampleAppointments = [
            {
                id: 1,
                userId: 1,
                specialty: 'Medicina General',
                doctor: 'Dr. Juan Pérez',
                date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                time: '10:00 AM',
                status: 'confirmada'
            },
            {
                id: 2,
                userId: 1,
                specialty: 'Cardiología',
                doctor: 'Dr. Carlos López',
                date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                time: '3:30 PM',
                status: 'confirmada'
            }
        ];
        
        appointments = sampleAppointments;
        localStorage.setItem('caverosalud_appointments', JSON.stringify(appointments));
    }

    // Mostrar modal de login
    loginBtn.addEventListener('click', function() {
        loginModal.style.display = 'flex';
    });

    // Mostrar modal de registro
    registerBtn.addEventListener('click', function() {
        registerModal.style.display = 'flex';
    });

    heroRegisterBtn.addEventListener('click', function() {
        registerModal.style.display = 'flex';
    });

    // Cerrar modales
    closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
            loginModal.style.display = 'none';
            registerModal.style.display = 'none';
        });
    });

    // Cambiar entre login y registro
    switchToRegister.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.style.display = 'none';
        registerModal.style.display = 'flex';
    });

    switchToLogin.addEventListener('click', function(e) {
        e.preventDefault();
        registerModal.style.display = 'none';
        loginModal.style.display = 'flex';
    });

    // Cerrar modal al hacer clic fuera
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === registerModal) {
            registerModal.style.display = 'none';
        }
    });

    // Procesar formulario de login
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailOrDni = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        
        // Buscar usuario
        const user = users.find(u => 
            (u.email === emailOrDni || u.dni === emailOrDni) && u.password === password
        );
        
        if (user) {
            currentUser = user;
            localStorage.setItem('caverosalud_currentUser', JSON.stringify(currentUser));
            loginModal.style.display = 'none';
            showDashboard();
            loginForm.reset();
        } else {
            alert('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
        }
    });

    // Procesar formulario de registro
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('registerName').value;
        const dni = document.getElementById('registerDni').value;
        const email = document.getElementById('registerEmail').value;
        const phone = document.getElementById('registerPhone').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('registerConfirmPassword').value;
        
        // Validaciones
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }
        
        if (users.find(u => u.email === email)) {
            alert('Ya existe un usuario con este correo electrónico.');
            return;
        }
        
        if (users.find(u => u.dni === dni)) {
            alert('Ya existe un usuario con este DNI.');
            return;
        }
        
        // Validar DNI (8 dígitos)
        if (!/^\d{8}$/.test(dni)) {
            alert('El DNI debe tener 8 dígitos.');
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            name,
            dni,
            email,
            phone,
            password,
            avatar: name.charAt(0).toUpperCase()
        };
        
        users.push(newUser);
        localStorage.setItem('caverosalud_users', JSON.stringify(users));
        
        currentUser = newUser;
        localStorage.setItem('caverosalud_currentUser', JSON.stringify(currentUser));
        
        registerModal.style.display = 'none';
        showDashboard();
        registerForm.reset();
        
        alert('¡Registro exitoso! Bienvenido a CaveroSalud Digital.');
    });

    // Cerrar sesión
    logoutBtn.addEventListener('click', function() {
        currentUser = null;
        localStorage.removeItem('caverosalud_currentUser');
        hideDashboard();
    });

    // Mostrar dashboard
    function showDashboard() {
        dashboard.style.display = 'block';
        document.querySelector('header').style.display = 'none';
        document.querySelector('.hero').style.display = 'none';
        document.querySelector('.features').style.display = 'none';
        document.querySelector('.how-it-works').style.display = 'none';
        document.querySelector('footer').style.display = 'none';
        
        // Actualizar información del usuario
        userName.textContent = currentUser.name;
        userEmail.textContent = currentUser.email;
        userAvatar.textContent = currentUser.avatar;
        
        // Cargar citas del usuario
        loadUserAppointments();
    }

    // Ocultar dashboard
    function hideDashboard() {
        dashboard.style.display = 'none';
        document.querySelector('header').style.display = 'block';
        document.querySelector('.hero').style.display = 'block';
        document.querySelector('.features').style.display = 'block';
        document.querySelector('.how-it-works').style.display = 'block';
        document.querySelector('footer').style.display = 'block';
    }

    // Cargar citas del usuario
    function loadUserAppointments() {
        const userAppointments = appointments.filter(a => a.userId === currentUser.id);
        
        if (userAppointments.length === 0) {
            appointmentsList.innerHTML = '<p>No tienes citas programadas.</p>';
            return;
        }
        
        appointmentsList.innerHTML = '';
        userAppointments.forEach(appointment => {
            const appointmentItem = document.createElement('li');
            appointmentItem.className = 'appointment-item';
            
            const statusClass = appointment.status === 'confirmada' ? 'btn-success' : 'btn-outline';
            const statusText = appointment.status === 'confirmada' ? 'Confirmada' : 'Pendiente';
            
            appointmentItem.innerHTML = `
                <div class="appointment-info">
                    <h4>${appointment.specialty}</h4>
                    <p>${appointment.doctor}</p>
                    <p>${formatDate(appointment.date)} - ${appointment.time}</p>
                </div>
                <div class="appointment-actions">
                    <button class="btn btn-sm ${statusClass}">${statusText}</button>
                    <button class="btn btn-sm btn-danger cancel-appointment" data-id="${appointment.id}">Cancelar</button>
                </div>
            `;
            
            appointmentsList.appendChild(appointmentItem);
        });
        
        // Agregar event listeners a los botones de cancelar
        document.querySelectorAll('.cancel-appointment').forEach(button => {
            button.addEventListener('click', function() {
                const appointmentId = parseInt(this.getAttribute('data-id'));
                cancelAppointment(appointmentId);
            });
        });
    }

    // Formatear fecha
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }

    // Cancelar cita
    function cancelAppointment(appointmentId) {
        if (confirm('¿Estás seguro de que deseas cancelar esta cita?')) {
            appointments = appointments.filter(a => a.id !== appointmentId);
            localStorage.setItem('caverosalud_appointments', JSON.stringify(appointments));
            loadUserAppointments();
            alert('Cita cancelada exitosamente.');
        }
    }

    // Agendar nueva cita
    newAppointmentBtn.addEventListener('click', function() {
        showAppointmentModal();
    });

    // Mostrar modal de agendar cita
    function showAppointmentModal() {
        // Crear modal dinámicamente
        const modal = document.createElement('div');
        modal.className = 'modal appointment-modal';
        modal.id = 'appointmentModal';
        
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <h2 class="form-title">Agendar Nueva Cita</h2>
                <form id="appointmentForm">
                    <div class="form-group">
                        <label>Selecciona Especialidad</label>
                        <div class="specialty-grid" id="specialtyGrid"></div>
                    </div>
                    
                    <div class="form-group" id="doctorSection" style="display: none;">
                        <label>Selecciona Médico</label>
                        <div class="doctor-list" id="doctorList"></div>
                    </div>
                    
                    <div class="form-group" id="dateSection" style="display: none;">
                        <label for="appointmentDate">Fecha de la cita</label>
                        <input type="date" id="appointmentDate" class="form-control" min="${getTomorrowDate()}" required>
                    </div>
                    
                    <div class="form-group" id="timeSection" style="display: none;">
                        <label>Selecciona Horario</label>
                        <div class="time-slots" id="timeSlots"></div>
                    </div>
                    
                    <button type="submit" class="btn btn-primary" style="width: 100%;" id="confirmAppointmentBtn" disabled>Confirmar Cita</button>
                </form>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Configurar eventos del modal
        const closeBtn = modal.querySelector('.close-modal');
        const specialtyGrid = modal.querySelector('#specialtyGrid');
        const doctorSection = modal.querySelector('#doctorSection');
        const doctorList = modal.querySelector('#doctorList');
        const dateSection = modal.querySelector('#dateSection');
        const timeSection = modal.querySelector('#timeSection');
        const timeSlots = modal.querySelector('#timeSlots');
        const appointmentForm = modal.querySelector('#appointmentForm');
        const confirmBtn = modal.querySelector('#confirmAppointmentBtn');
        
        let selectedSpecialty = null;
        let selectedDoctor = null;
        let selectedDate = null;
        let selectedTime = null;
        
        // Cargar especialidades
        specialties.forEach(specialty => {
            const specialtyOption = document.createElement('div');
            specialtyOption.className = 'specialty-option';
            specialtyOption.innerHTML = `
                <div style="font-size: 2rem;">${specialty.icon}</div>
                <div>${specialty.name}</div>
            `;
            
            specialtyOption.addEventListener('click', function() {
                document.querySelectorAll('.specialty-option').forEach(opt => {
                    opt.classList.remove('selected');
                });
                this.classList.add('selected');
                
                selectedSpecialty = specialty;
                loadDoctors(specialty.id);
                doctorSection.style.display = 'block';
                updateConfirmButton();
            });
            
            specialtyGrid.appendChild(specialtyOption);
        });
        
        // Cargar médicos según especialidad
        function loadDoctors(specialtyId) {
            doctorList.innerHTML = '';
            const filteredDoctors = doctors.filter(doctor => {
                const specialtyName = specialties.find(s => s.id === specialtyId).name;
                return doctor.specialty === specialtyName;
            });
            
            filteredDoctors.forEach(doctor => {
                const doctorOption = document.createElement('div');
                doctorOption.className = 'doctor-option';
                doctorOption.innerHTML = `
                    <div class="doctor-avatar">${doctor.avatar}</div>
                    <div>
                        <h4>${doctor.name}</h4>
                        <p>${doctor.specialty}</p>
                    </div>
                `;
                
                doctorOption.addEventListener('click', function() {
                    document.querySelectorAll('.doctor-option').forEach(opt => {
                        opt.classList.remove('selected');
                    });
                    this.classList.add('selected');
                    
                    selectedDoctor = doctor;
                    dateSection.style.display = 'block';
                    updateConfirmButton();
                });
                
                doctorList.appendChild(doctorOption);
            });
        }
        
        // Configurar selector de fecha
        const dateInput = modal.querySelector('#appointmentDate');
        dateInput.addEventListener('change', function() {
            selectedDate = this.value;
            timeSection.style.display = 'block';
            loadTimeSlots();
            updateConfirmButton();
        });
        
        // Cargar horarios disponibles
        function loadTimeSlots() {
            timeSlots.innerHTML = '';
            const timeSlotsArray = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
            
            timeSlotsArray.forEach(time => {
                const timeSlot = document.createElement('div');
                timeSlot.className = 'time-slot';
                timeSlot.textContent = time;
                
                // Verificar si el horario ya está ocupado
                const isOccupied = appointments.some(apt => 
                    apt.date === selectedDate && 
                    apt.time === time && 
                    apt.doctor === selectedDoctor.name
                );
                
                if (isOccupied) {
                    timeSlot.classList.add('unavailable');
                    timeSlot.title = 'Horario no disponible';
                } else {
                    timeSlot.addEventListener('click', function() {
                        document.querySelectorAll('.time-slot').forEach(slot => {
                            slot.classList.remove('selected');
                        });
                        this.classList.add('selected');
                        
                        selectedTime = time;
                        updateConfirmButton();
                    });
                }
                
                timeSlots.appendChild(timeSlot);
            });
        }
        
        // Actualizar estado del botón de confirmación
        function updateConfirmButton() {
            if (selectedSpecialty && selectedDoctor && selectedDate && selectedTime) {
                confirmBtn.disabled = false;
            } else {
                confirmBtn.disabled = true;
            }
        }
        
        // Procesar formulario de cita
        appointmentForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const newAppointment = {
                id: Date.now(),
                userId: currentUser.id,
                specialty: selectedSpecialty.name,
                doctor: selectedDoctor.name,
                date: selectedDate,
                time: selectedTime,
                status: 'confirmada'
            };
            
            appointments.push(newAppointment);
            localStorage.setItem('caverosalud_appointments', JSON.stringify(appointments));
            
            modal.remove();
            loadUserAppointments();
            
            alert(`¡Cita agendada exitosamente!\nEspecialidad: ${selectedSpecialty.name}\nMédico: ${selectedDoctor.name}\nFecha: ${formatDate(selectedDate)}\nHora: ${selectedTime}`);
        });
        
        // Cerrar modal
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Mostrar modal
        modal.style.display = 'flex';
    }

    // Obtener fecha de mañana en formato YYYY-MM-DD
    function getTomorrowDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }

    // Inicializar la página
    initPage();
});
