import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { ContactComponent } from './contact.component';
import { AnalyticsService } from '../../core/services/analytics.service';
import { SeoService } from '../../core/services/seo.service';
import { NotificationService } from '../../core/services/notifications.service';

describe('ContactComponent (Jest)', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let notificationService: jest.Mocked<NotificationService>;
  let analyticsService: jest.Mocked<AnalyticsService>;
  let seoService: jest.Mocked<SeoService>;

  beforeEach(async () => {
    const notificationMock: jest.Mocked<NotificationService> = {
      success: jest.fn(),
      error: jest.fn(),
      warning: jest.fn(),
      info: jest.fn()
    } as any;

    const analyticsMock: jest.Mocked<AnalyticsService> = {
      trackContactFormSubmit: jest.fn(),
      trackEvent: jest.fn()
    } as any;

    const seoMock: jest.Mocked<SeoService> = {
      update: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        ReactiveFormsModule,
        HttpClientTestingModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: NotificationService, useValue: notificationMock },
        { provide: AnalyticsService, useValue: analyticsMock },
        { provide: SeoService, useValue: seoMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    notificationService = TestBed.inject(NotificationService) as jest.Mocked<NotificationService>;
    analyticsService = TestBed.inject(AnalyticsService) as jest.Mocked<AnalyticsService>;
    seoService = TestBed.inject(SeoService) as jest.Mocked<SeoService>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ---------------------------
  // FORM INITIALIZATION
  // ---------------------------
  describe('Form Initialization', () => {
    it('should create form with all controls', () => {
      expect(component.contactForm.get('name')).toBeDefined();
      expect(component.contactForm.get('email')).toBeDefined();
      expect(component.contactForm.get('subject')).toBeDefined();
      expect(component.contactForm.get('message')).toBeDefined();
    });

    it('should initialize with empty values', () => {
      expect(component.contactForm.get('name')?.value).toBe('');
      expect(component.contactForm.get('email')?.value).toBe('');
      expect(component.contactForm.get('subject')?.value).toBe('');
      expect(component.contactForm.get('message')?.value).toBe('');
    });

    it('should set required validators on all fields', () => {
      const nameControl = component.contactForm.get('name');
      const emailControl = component.contactForm.get('email');
      const subjectControl = component.contactForm.get('subject');
      const messageControl = component.contactForm.get('message');

      expect(nameControl?.hasError('required')).toBe(true);
      expect(emailControl?.hasError('required')).toBe(true);
      expect(subjectControl?.hasError('required')).toBe(true);
      expect(messageControl?.hasError('required')).toBe(true);
    });

    it('should validate email format', () => {
      const emailControl = component.contactForm.get('email');
      emailControl?.setValue('invalid-email');
      expect(emailControl?.hasError('email')).toBe(true);

      emailControl?.setValue('test@example.com');
      expect(emailControl?.valid).toBe(true);
    });

    it('should validate message minlength', () => {
      const messageControl = component.contactForm.get('message');
      messageControl?.setValue('short');
      expect(messageControl?.hasError('minlength')).toBe(true);

      messageControl?.setValue('Long enough message here');
      expect(messageControl?.valid).toBe(true);
    });
  });

  // ---------------------------
  // FORM VALIDATION
  // ---------------------------
  describe('Form Validation', () => {
    it('should validate name field', () => {
      const nameControl = component.contactForm.get('name');
      expect(nameControl?.valid).toBe(false);
      nameControl?.setValue('John Doe');
      expect(nameControl?.valid).toBe(true);
    });

    it('should validate email field', () => {
      const emailControl = component.contactForm.get('email');
      emailControl?.setValue('invalid');
      expect(emailControl?.valid).toBe(false);
      emailControl?.setValue('valid@email.com');
      expect(emailControl?.valid).toBe(true);
    });

    it('should validate subject field', () => {
      const subjectControl = component.contactForm.get('subject');
      expect(subjectControl?.valid).toBe(false);
      subjectControl?.setValue('Inquiry');
      expect(subjectControl?.valid).toBe(true);
    });

    it('should validate message field', () => {
      const messageControl = component.contactForm.get('message');
      messageControl?.setValue('Too short');
      expect(messageControl?.valid).toBe(false);
      messageControl?.setValue('This is a valid message of sufficient length');
      expect(messageControl?.valid).toBe(true);
    });

    it('should make form valid when all fields are valid', () => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Hello',
        message: 'This is a valid message with enough characters'
      });
      expect(component.contactForm.valid).toBe(true);
    });
  });

  // ---------------------------
  // FORM SUBMISSION
  // ---------------------------
  describe('Form Submission', () => {
    beforeEach(() => {
      component.contactForm.patchValue({
        name: 'John Doe',
        email: 'john@example.com',
        subject: 'Test Subject',
        message: 'Valid message with more than 10 chars'
      });
    });

    it('should not submit if form is invalid', () => {
      component.contactForm.patchValue({ email: 'bad' });
      component.onSubmit();
      expect(component.isSubmitting()).toBe(false);
      expect(notificationService.success).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when invalid', () => {
      component.contactForm.patchValue({ name: '', email: '', subject: '', message: '' });
      component.onSubmit();
      expect(component.contactForm.get('name')?.touched).toBe(true);
      expect(component.contactForm.get('email')?.touched).toBe(true);
      expect(component.contactForm.get('subject')?.touched).toBe(true);
      expect(component.contactForm.get('message')?.touched).toBe(true);
    });

    it('should submit valid form and trigger services', fakeAsync(() => {
      component.onSubmit();
      expect(component.isSubmitting()).toBe(true);
      tick(2000);
      expect(component.isSubmitting()).toBe(false);
      expect(notificationService.success).toHaveBeenCalledWith(
        "Message sent successfully! I'll get back to you soon."
      );
      expect(analyticsService.trackContactFormSubmit).toHaveBeenCalledWith('contact-form');
    }));

    it('should reset form after successful submission', fakeAsync(() => {
      component.onSubmit();
      tick(2000);
      expect(component.contactForm.get('name')?.value).toBe(null);
      expect(component.contactForm.get('email')?.value).toBe(null);
      expect(component.contactForm.get('subject')?.value).toBe(null);
      expect(component.contactForm.get('message')?.value).toBe(null);
    }));

    it('should disable button while submitting', () => {
      const btn = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(btn.nativeElement.disabled).toBe(false);
      component.isSubmitting.set(true);
      fixture.detectChanges();
      expect(btn.nativeElement.disabled).toBe(true);
    });
  });

  // ---------------------------
  // TEMPLATE RENDERING
  // ---------------------------
  describe('Template Rendering', () => {
    it('should render all form fields', () => {
      expect(fixture.debugElement.query(By.css('#name'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#email'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#subject'))).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#message'))).toBeTruthy();
    });

    it('should show error messages when invalid and touched', () => {
      const control = component.contactForm.get('name');
      control?.markAsTouched();
      fixture.detectChanges();
      const errorMessage = fixture.debugElement.query(By.css('.text-red-500'));
      expect(errorMessage.nativeElement.textContent).toContain('Name is required');
    });

    it('should show loading state', () => {
      component.isSubmitting.set(true);
      fixture.detectChanges();
      const button = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(button.nativeElement.textContent).toContain('Sending...');
      expect(fixture.debugElement.query(By.css('.animate-spin'))).toBeTruthy();
    });

    it('should render contact information list', () => {
      expect(component.contactInfo.length).toBeGreaterThan(0);
      const infoEls = fixture.debugElement.queryAll(By.css('.flex.items-start'));
      expect(infoEls.length).toBe(component.contactInfo.length);
    });

    it('should render social links', () => {
      expect(component.socialLinks.length).toBeGreaterThan(0);
      const links = fixture.debugElement.queryAll(By.css('a[target="_blank"]'));
      expect(links.length).toBeGreaterThanOrEqual(component.socialLinks.length);
    });
  });

  // ---------------------------
  // SEO
  // ---------------------------
  describe('SEO', () => {
    it('should set SEO tags on init', () => {
      expect(seoService.update).toHaveBeenCalledWith({
        title: 'Contact',
        description: 'Get in touch for collaboration, consulting, or career opportunities',
        keywords: 'contact, hire, angular developer, collaboration, consulting'
      });
    });
  });

  // ---------------------------
  // ACCESSIBILITY
  // ---------------------------
  describe('Accessibility', () => {
    it('should have labels matching inputs', () => {
      const labels = fixture.debugElement.queryAll(By.css('label'));
      expect(labels.length).toBe(4);
      labels.forEach(label => {
        const forAttr = label.nativeElement.getAttribute('for');
        expect(forAttr).toBeTruthy();
        const input = fixture.debugElement.query(By.css(`#${forAttr}`));
        expect(input).toBeTruthy();
      });
    });

    it('should have aria-labels for social links', () => {
      const socialLinks = fixture.debugElement.queryAll(By.css('[aria-label]'));
      socialLinks.forEach(link => {
        expect(link.nativeElement.getAttribute('aria-label')).toBeTruthy();
      });
    });

    it('should indicate required fields', () => {
      const indicator = fixture.debugElement.query(By.css('.text-sm.text-gray-500'));
      expect(indicator.nativeElement.textContent).toContain('* Required fields');
    });
  });

  // ---------------------------
  // ERROR STATES
  // ---------------------------
  describe('Error States', () => {
    it('should add error class to invalid touched field', () => {
      const input = fixture.debugElement.query(By.css('#name'));
      const control = component.contactForm.get('name');
      control?.markAsTouched();
      fixture.detectChanges();
      expect(input.nativeElement.classList.contains('border-red-500')).toBe(true);
    });

    it('should remove error class when valid', () => {
      const input = fixture.debugElement.query(By.css('#name'));
      const control = component.contactForm.get('name');
      control?.markAsTouched();
      fixture.detectChanges();
      expect(input.nativeElement.classList.contains('border-red-500')).toBe(true);
      control?.setValue('Valid Name');
      fixture.detectChanges();
      expect(input.nativeElement.classList.contains('border-red-500')).toBe(false);
    });
  });
});
