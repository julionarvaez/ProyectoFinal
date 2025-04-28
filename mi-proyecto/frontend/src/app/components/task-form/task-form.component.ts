import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  @Output() taskAdded = new EventEmitter<Task>();
  
  taskForm: FormGroup;
  loading = false;
  error = '';
  success = '';

  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService
  ) { }

  ngOnInit(): void {
    this.taskForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      description: [''],
      status: ['pendiente', [Validators.required]]
    });
  }

  // Getter para acceder fácilmente a los campos del formulario
  get f() { return this.taskForm.controls; }

  onSubmit(): void {
    // Detener si el formulario es inválido
    if (this.taskForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const task: Task = {
      title: this.f.title.value,
      description: this.f.description.value,
      status: this.f.status.value
    };

    this.taskService.createTask(task).subscribe(
      (newTask) => {
        this.success = 'Tarea creada exitosamente';
        this.loading = false;
        this.taskForm.reset({
          title: '',
          description: '',
          status: 'pendiente'
        });
        this.taskAdded.emit(newTask);
        
        // Limpiar mensaje de éxito después de 3 segundos
        setTimeout(() => {
          this.success = '';
        }, 3000);
      },
      (error) => {
        this.error = error.error.msg || 'Error al crear la tarea';
        this.loading = false;
      }
    );
  }
}