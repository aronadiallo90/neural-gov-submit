import React, { useState, useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import NeuralBackground from './NeuralBackground';
import ProgressBar from './ProgressBar';
import ParticleField from './ParticleField';

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface FormData {
  projectName: string;
  sector: string;
  description: string;
  teamLeader: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
  teamMembers: TeamMember[];
}

const GovathonForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectName: '',
    sector: '',
    description: '',
    teamLeader: {
      name: '',
      email: '',
      phone: '',
      role: 'Chef d\'équipe',
    },
    teamMembers: [],
  });

  const formRef = useRef<HTMLDivElement>(null);
  const speechSynthesis = useRef<SpeechSynthesis | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      speechSynthesis.current = window.speechSynthesis;
    }
  }, []);

  const speak = (text: string) => {
    if (speechSynthesis.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'fr-FR';
      utterance.rate = 0.9;
      speechSynthesis.current.speak(utterance);
    }
  };

  const addTeamMember = () => {
    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: '',
      email: '',
      role: '',
    };
    setFormData(prev => ({
      ...prev,
      teamMembers: [...prev.teamMembers, newMember],
    }));
  };

  const removeTeamMember = (id: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.filter(member => member.id !== id),
    }));
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: string) => {
    setFormData(prev => ({
      ...prev,
      teamMembers: prev.teamMembers.map(member =>
        member.id === id ? { ...member, [field]: value } : member
      ),
    }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.projectName.trim()) {
          alert('Le nom du projet est requis');
          speak('Erreur: Le nom du projet est requis');
          return false;
        }
        if (!formData.description.trim()) {
          alert('La description du projet est requise');
          speak('Erreur: La description du projet est requise');
          return false;
        }
        return true;
      case 2:
        if (!formData.teamLeader.name.trim()) {
          alert('Le nom du chef d\'équipe est requis');
          speak('Erreur: Le nom du chef d\'équipe est requis');
          return false;
        }
        if (!formData.teamLeader.email.trim()) {
          alert('L\'email du chef d\'équipe est requis');
          speak('Erreur: L\'email du chef d\'équipe est requis');
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      const newStep = currentStep + 1;
      setCurrentStep(newStep);
      
      // Add glitch transition effect
      if (formRef.current) {
        formRef.current.style.animation = 'glitch 0.3s ease-out';
        setTimeout(() => {
          if (formRef.current) {
            formRef.current.style.animation = '';
          }
        }, 300);
      }

      // Voice feedback
      switch (newStep) {
        case 2:
          speak('Étape 2: Configuration de l\'équipe');
          break;
        case 3:
          speak('Étape 3: Confirmation des informations');
          break;
      }
    }
  };

  const prevStep = () => {
    const newStep = currentStep - 1;
    setCurrentStep(newStep);
    
    // Add glitch transition effect
    if (formRef.current) {
      formRef.current.style.animation = 'glitch 0.3s ease-out';
      setTimeout(() => {
        if (formRef.current) {
          formRef.current.style.animation = '';
        }
      }, 300);
    }
  };

  const goToStep = (step: number) => {
    if (step <= currentStep || validateStep(currentStep)) {
      setCurrentStep(step);
      speak(`Étape ${step}`);
    }
  };

  const createConfetti = () => {
    const colors = ['#00A859', '#00D674', '#ffffff'];
    const confettiContainer = document.createElement('div');
    confettiContainer.style.position = 'fixed';
    confettiContainer.style.top = '0';
    confettiContainer.style.left = '0';
    confettiContainer.style.width = '100%';
    confettiContainer.style.height = '100%';
    confettiContainer.style.pointerEvents = 'none';
    confettiContainer.style.zIndex = '9999';
    document.body.appendChild(confettiContainer);

    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.style.position = 'absolute';
      confetti.style.width = '10px';
      confetti.style.height = '10px';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.top = '-10px';
      confetti.style.borderRadius = '50%';
      confetti.style.animation = `matrix-rain ${Math.random() * 3 + 2}s linear forwards`;
      confettiContainer.appendChild(confetti);
    }

    setTimeout(() => {
      document.body.removeChild(confettiContainer);
    }, 5000);
  };

  const submitForm = async () => {
    setIsSubmitting(true);
    
    // Green flash effect
    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = '#00A859';
    flash.style.opacity = '0.8';
    flash.style.zIndex = '9998';
    flash.style.animation = 'fade-out 0.5s ease-out forwards';
    document.body.appendChild(flash);

    createConfetti();

    // Success message with typewriter effect
    setTimeout(() => {
      const successDiv = document.createElement('div');
      successDiv.style.position = 'fixed';
      successDiv.style.top = '50%';
      successDiv.style.left = '50%';
      successDiv.style.transform = 'translate(-50%, -50%)';
      successDiv.style.zIndex = '10000';
      successDiv.style.fontFamily = 'Orbitron, monospace';
      successDiv.style.fontSize = '2rem';
      successDiv.style.fontWeight = 'bold';
      successDiv.style.color = '#00A859';
      successDiv.style.textShadow = '0 0 20px #00A859';
      successDiv.style.textAlign = 'center';
      document.body.appendChild(successDiv);

      const message = 'Félicitations, vous avez soumis avec succès';
      let currentChar = 0;

      const typeWriter = () => {
        if (currentChar < message.length) {
          successDiv.textContent = message.substring(0, currentChar + 1);
          currentChar++;
          setTimeout(typeWriter, 50);
        } else {
          // Play triumph sound
          const audioContext = new AudioContext();
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          
          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);
          
          oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
          oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
          oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
          
          gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
          
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.5);
        }
      };

      typeWriter();
      
      setTimeout(() => {
        document.body.removeChild(flash);
        document.body.removeChild(successDiv);
      }, 3500);
    }, 500);

    // Log form data
    console.log('Données soumises:', formData);

    // Reload after animation
    setTimeout(() => {
      window.location.reload();
    }, 3500);
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2 glitch-text">
          <i className="fas fa-rocket icon-3d mr-3"></i>
          Informations du Projet
        </h2>
        <p className="text-muted-foreground">Décrivez votre projet innovant</p>
      </div>

      <div className="space-y-4">
        <div>
          <Label htmlFor="projectName" className="text-foreground font-medium">
            Nom du Projet *
          </Label>
          <Input
            id="projectName"
            className="form-input-ai"
            value={formData.projectName}
            onChange={(e) => setFormData(prev => ({ ...prev, projectName: e.target.value }))}
            placeholder="Ex: IA pour l'optimisation des services publics"
          />
        </div>

        <div>
          <Label htmlFor="sector" className="text-foreground font-medium">
            Secteur
          </Label>
          <Input
            id="sector"
            className="form-input-ai"
            value={formData.sector}
            onChange={(e) => setFormData(prev => ({ ...prev, sector: e.target.value }))}
            placeholder="Ex: Santé, Éducation, Transport..."
          />
        </div>

        <div>
          <Label htmlFor="description" className="text-foreground font-medium">
            Description du Projet *
          </Label>
          <Textarea
            id="description"
            className="form-input-ai min-h-[120px]"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Décrivez votre projet, ses objectifs et son impact..."
          />
        </div>
      </div>

      <div className="flex justify-end">
        <Button onClick={nextStep} className="btn-futuristic">
          Suivant
          <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2 glitch-text">
          <i className="fas fa-users icon-3d mr-3"></i>
          Configuration de l'Équipe
        </h2>
        <p className="text-muted-foreground">Ajoutez les membres de votre équipe</p>
      </div>

      {/* Chef d'équipe */}
      <div className="holographic rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-primary mb-4">
          <i className="fas fa-user-crown icon-3d mr-2"></i>
          Chef d'Équipe
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="leaderName" className="text-foreground font-medium">
              Nom *
            </Label>
            <Input
              id="leaderName"
              className="form-input-ai"
              value={formData.teamLeader.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                teamLeader: { ...prev.teamLeader, name: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="leaderEmail" className="text-foreground font-medium">
              Email *
            </Label>
            <Input
              id="leaderEmail"
              type="email"
              className="form-input-ai"
              value={formData.teamLeader.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                teamLeader: { ...prev.teamLeader, email: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="leaderPhone" className="text-foreground font-medium">
              Téléphone
            </Label>
            <Input
              id="leaderPhone"
              className="form-input-ai"
              value={formData.teamLeader.phone}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                teamLeader: { ...prev.teamLeader, phone: e.target.value }
              }))}
            />
          </div>
          <div>
            <Label htmlFor="leaderRole" className="text-foreground font-medium">
              Rôle
            </Label>
            <Input
              id="leaderRole"
              className="form-input-ai"
              value={formData.teamLeader.role}
              readOnly
            />
          </div>
        </div>
      </div>

      {/* Membres de l'équipe */}
      <div className="holographic rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-primary">
            <i className="fas fa-users icon-3d mr-2"></i>
            Membres de l'Équipe
          </h3>
          <Button onClick={addTeamMember} className="btn-futuristic">
            <i className="fas fa-plus mr-2"></i>
            Ajouter
          </Button>
        </div>

        {formData.teamMembers.map((member) => (
          <div key={member.id} className="border border-border rounded-lg p-4 mb-4 last:mb-0">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-foreground font-medium">Nom</Label>
                <Input
                  className="form-input-ai"
                  value={member.name}
                  onChange={(e) => updateTeamMember(member.id, 'name', e.target.value)}
                />
              </div>
              <div>
                <Label className="text-foreground font-medium">Email</Label>
                <Input
                  type="email"
                  className="form-input-ai"
                  value={member.email}
                  onChange={(e) => updateTeamMember(member.id, 'email', e.target.value)}
                />
              </div>
              <div className="flex space-x-2">
                <div className="flex-1">
                  <Label className="text-foreground font-medium">Rôle</Label>
                  <Input
                    className="form-input-ai"
                    value={member.role}
                    onChange={(e) => updateTeamMember(member.id, 'role', e.target.value)}
                  />
                </div>
                <div className="flex items-end">
                  <Button
                    onClick={() => removeTeamMember(member.id)}
                    variant="destructive"
                    size="sm"
                  >
                    <i className="fas fa-trash"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {formData.teamMembers.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <i className="fas fa-users text-4xl mb-2 opacity-50"></i>
            <p>Aucun membre ajouté. Cliquez sur "Ajouter" pour commencer.</p>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline" className="border-primary text-primary">
          <i className="fas fa-arrow-left mr-2"></i>
          Précédent
        </Button>
        <Button onClick={nextStep} className="btn-futuristic">
          Suivant
          <i className="fas fa-arrow-right ml-2"></i>
        </Button>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-primary mb-2 glitch-text">
          <i className="fas fa-check-circle icon-3d mr-3"></i>
          Confirmation
        </h2>
        <p className="text-muted-foreground">Vérifiez vos informations avant soumission</p>
      </div>

      <div className="space-y-6">
        {/* Projet */}
        <div className="holographic rounded-lg p-6">
          <h3 className="text-xl font-semibold text-primary mb-4">
            <i className="fas fa-file-alt icon-3d mr-2"></i>
            Projet
          </h3>
          <div className="space-y-2">
            <p><strong>Nom:</strong> {formData.projectName}</p>
            <p><strong>Secteur:</strong> {formData.sector || 'Non spécifié'}</p>
            <p><strong>Description:</strong> {formData.description}</p>
          </div>
        </div>

        {/* Chef d'équipe */}
        <div className="holographic rounded-lg p-6">
          <h3 className="text-xl font-semibold text-primary mb-4">
            <i className="fas fa-user-crown icon-3d mr-2"></i>
            Chef d'Équipe
          </h3>
          <div className="space-y-2">
            <p><strong>Nom:</strong> {formData.teamLeader.name}</p>
            <p><strong>Email:</strong> {formData.teamLeader.email}</p>
            <p><strong>Téléphone:</strong> {formData.teamLeader.phone || 'Non spécifié'}</p>
            <p><strong>Rôle:</strong> {formData.teamLeader.role}</p>
          </div>
        </div>

        {/* Membres */}
        {formData.teamMembers.length > 0 && (
          <div className="holographic rounded-lg p-6">
            <h3 className="text-xl font-semibold text-primary mb-4">
              <i className="fas fa-users icon-3d mr-2"></i>
              Membres de l'Équipe ({formData.teamMembers.length})
            </h3>
            <div className="space-y-3">
              {formData.teamMembers.map((member, index) => (
                <div key={member.id} className="border-l-2 border-primary pl-4">
                  <p className="font-medium">{member.name || `Membre ${index + 1}`}</p>
                  <p className="text-sm text-muted-foreground">{member.email}</p>
                  <p className="text-sm text-muted-foreground">{member.role || 'Rôle non spécifié'}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        <Button onClick={prevStep} variant="outline" className="border-primary text-primary">
          <i className="fas fa-arrow-left mr-2"></i>
          Précédent
        </Button>
        <Button 
          onClick={submitForm} 
          className="btn-futuristic"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <i className="fas fa-spinner animate-spin mr-2"></i>
              Soumission...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane mr-2"></i>
              Soumettre
            </>
          )}
        </Button>
      </div>
    </div>
  );

  return (
    <div className="neural-bg min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      <NeuralBackground />
      <ParticleField />
      
      <div 
        ref={formRef}
        className="w-full max-w-4xl mx-auto relative z-10"
        style={{
          transform: 'perspective(1000px) rotateX(2deg)',
          transition: 'transform 0.3s ease-out',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(2deg)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'perspective(1000px) rotateX(2deg)';
        }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-primary mb-4 font-heading glitch-text">
            Gov'athon 2025
          </h1>
          <p className="text-xl text-muted-foreground font-body">
            Soumission de Projet IA - Futur des Services Publics
          </p>
        </div>

        {/* Progress Bar */}
        <ProgressBar currentStep={currentStep} onStepClick={goToStep} />

        {/* Form Card */}
        <Card className="holographic p-8 mt-8">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </Card>
      </div>
    </div>
  );
};

export default GovathonForm;