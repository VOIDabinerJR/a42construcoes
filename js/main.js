// Dynamic Form Fields for Budget Section
document.addEventListener('DOMContentLoaded', function() {
    // Project Type Change Handler
    const projectType = document.getElementById('project-type');
    const projectCategory = document.getElementById('project-category');
    
    // Categories for each project type
    const categories = {
        residential: [
            {value: 'house', label: 'Casa'},
            {value: 'apartment', label: 'Apartamento'},
            {value: 'duplex', label: 'Duplex'},
            {value: 'townhouse', label: 'Sobrado'},
            {value: 'country-house', label: 'Casa de Campo'},
            {value: 'beach-house', label: 'Casa de Praia'},
            {value: 'other-residential', label: 'Outro'}
        ],
        commercial: [
            {value: 'store', label: 'Loja/Comércio'},
            {value: 'office', label: 'Escritório'},
            {value: 'restaurant', label: 'Restaurante/Bar'},
            {value: 'hotel', label: 'Hotel/Pousada'},
            {value: 'clinic', label: 'Clínica Médica'},
            {value: 'gym', label: 'Academia'},
            {value: 'other-commercial', label: 'Outro'}
        ],
        industrial: [
            {value: 'factory', label: 'Fábrica'},
            {value: 'warehouse', label: 'Armazém/Galpão'},
            {value: 'industrial-shed', label: 'Galpão Industrial'},
            {value: 'other-industrial', label: 'Outro'}
        ],
        reform: [
            {value: 'residential-reform', label: 'Reforma Residencial'},
            {value: 'commercial-reform', label: 'Reforma Comercial'},
            {value: 'expansion', label: 'Ampliação'},
            {value: 'facade', label: 'Reforma de Fachada'},
            {value: 'other-reform', label: 'Outro'}
        ],
        wall: [
            {value: 'boundary-wall', label: 'Muro de Vedação'},
            {value: 'retaining-wall', label: 'Muro de Arrimo'},
            {value: 'decoration-wall', label: 'Muro Decorativo'},
            {value: 'security-wall', label: 'Muro de Segurança'},
            {value: 'other-wall', label: 'Outro'}
        ],
        other: [
            {value: 'other-project', label: 'Outro Tipo de Projeto'}
        ]
    };
    
    projectType.addEventListener('change', function() {
        // Hide all dynamic fields
        document.querySelectorAll('.dynamic-fields').forEach(field => {
            field.style.display = 'none';
        });
        
        // Clear and populate category dropdown
        projectCategory.innerHTML = '<option value="">Selecione...</option>';
        
        if (this.value && categories[this.value]) {
            categories[this.value].forEach(category => {
                const option = document.createElement('option');
                option.value = category.value;
                option.textContent = category.label;
                projectCategory.appendChild(option);
            });
            
            // Show relevant dynamic fields
            if (this.value === 'residential') {
                document.getElementById('residential-fields').style.display = 'block';
            } else if (this.value === 'commercial') {
                document.getElementById('commercial-fields').style.display = 'block';
            } else if (this.value === 'wall') {
                document.getElementById('wall-fields').style.display = 'block';
            }
        } else {
            projectCategory.innerHTML = '<option value="">Selecione o tipo primeiro</option>';
        }
    });
    
    // File Upload Handling
    const fileUploadArea = document.getElementById('file-upload-area');
    const fileInput = document.getElementById('reference-files');
    const filePreview = document.getElementById('file-preview');
    
    fileUploadArea.addEventListener('click', function() {
        fileInput.click();
    });
    
    fileUploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('dragover');
    });
    
    fileUploadArea.addEventListener('dragleave', function() {
        this.classList.remove('dragover');
    });
    
    fileUploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('dragover');
        if (e.dataTransfer.files.length) {
            fileInput.files = e.dataTransfer.files;
            updateFilePreview();
        }
    });
    
    fileInput.addEventListener('change', updateFilePreview);
    
    function updateFilePreview() {
        filePreview.innerHTML = '';
        
        if (fileInput.files.length > 0) {
            Array.from(fileInput.files).forEach(file => {
                const fileItem = document.createElement('div');
                fileItem.className = 'file-preview-item';
                
                if (file.type.startsWith('image/')) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        const img = document.createElement('img');
                        img.src = e.target.result;
                        fileItem.appendChild(img);
                        
                        const removeBtn = document.createElement('span');
                        removeBtn.className = 'remove-file';
                        removeBtn.innerHTML = '&times;';
                        removeBtn.addEventListener('click', function(e) {
                            e.stopPropagation();
                            removeFile(file);
                        });
                        fileItem.appendChild(removeBtn);
                    };
                    reader.readAsDataURL(file);
                } else {
                    fileItem.innerHTML = `
                        <div style="padding: 10px; text-align: center;">
                            <i class="fas fa-file" style="font-size: 2rem; color: var(--secondary-color);"></i>
                            <p style="margin-top: 5px; font-size: 0.8rem; word-break: break-all;">${file.name}</p>
                            <span class="remove-file" style="position: absolute; top: 5px; right: 5px;">&times;</span>
                        </div>
                    `;
                    fileItem.querySelector('.remove-file').addEventListener('click', function(e) {
                        e.stopPropagation();
                        removeFile(file);
                    });
                }
                
                filePreview.appendChild(fileItem);
            });
        }
    }
    
    function removeFile(fileToRemove) {
        const newFiles = Array.from(fileInput.files).filter(file => file !== fileToRemove);
        
        const dataTransfer = new DataTransfer();
        newFiles.forEach(file => dataTransfer.items.add(file));
        fileInput.files = dataTransfer.files;
        
        updateFilePreview();
    }
    
    // Form Submission
    const budgetForm = document.getElementById('budget-form');
    
    budgetForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic validation
        if (!projectType.value || !projectCategory.value || !document.getElementById('project-area').value) {
            alert('Por favor, preencha os campos obrigatórios.');
            return;
        }
        
        // Here you would typically send the form data to the server
        // For this example, we'll just show a success message
        alert('Solicitação de orçamento enviada com sucesso! Entraremos em contato em breve.');
        budgetForm.reset();
        filePreview.innerHTML = '';
    });
});