import { RequiredEntityData } from "@mikro-orm/postgresql";
import { HouseholdMemberTypes } from "../../settings/entities/household-member-type.entity";
import { HOUSEHOLD_MEMBER_TYPE, HouseholdMemberInfo, ReferenceInfo } from "../dto/create-application.dto";
import { AdoptApplications } from "../entities/applications/adopt-applications.entity";
import { FosterApplications } from "../entities/applications/foster-applications.entity";
import { AdoptApplicationsRepository } from "../repositories/applications/adopt-applications.repository";
import { FosterApplicationsRepository } from "../repositories/applications/foster-applications.repository";
import { HouseholdInfoRepository } from "../repositories/applications/household-info.repository";
import { ReferenceInfoRepository } from "../repositories/applications/reference-info.repository";
import { AdoptApplicationPetRepository } from "../repositories/adopt-application-pet.repository";
import { PetCategories } from "../../pets/entities/pet-categories.entity";
import { Status } from "../../settings/entities/status.entity";
import { FosterApplicationPetCategoryRepository } from "../repositories/foster-application-pet-category.repository";
import { Pets } from "../../pets/entities/pets.entity";

interface FormBuilder {
    setForm: (
        essentialInfro:
            RequiredEntityData<AdoptApplications, never, false>
            | RequiredEntityData<FosterApplications, never, false>
    ) => void;
    setReferenceInfo: (referenceInfo: ReferenceInfo[]) => void;
    setHouseholdInfo: (type: HouseholdMemberTypes, info: number[] | HouseholdMemberInfo[]) => void
}

export class AdoptionFormBuilder implements FormBuilder {
    private adoptionForm: AdoptApplications;
    private repository: AdoptApplicationsRepository;
    private referenceInfoRepository: ReferenceInfoRepository;
    private householdInfoRepository: HouseholdInfoRepository;
    private adoptApplicationPetRepository: AdoptApplicationPetRepository;

    constructor(
        repository: AdoptApplicationsRepository,
        referenceInfoRepository: ReferenceInfoRepository,
        householdInfoRepository: HouseholdInfoRepository,
        adoptApplicationPetRepository: AdoptApplicationPetRepository,
    ) {
        this.repository = repository;
        this.referenceInfoRepository = referenceInfoRepository;
        this.householdInfoRepository = householdInfoRepository;
        this.adoptApplicationPetRepository = adoptApplicationPetRepository;
    }

    setForm = (essentialInfro: RequiredEntityData<AdoptApplications, never, false>) => {
        this.adoptionForm = this.repository.create(essentialInfro);
    }

    setReferenceInfo = (referenceInfo: ReferenceInfo[]) => {
        referenceInfo.forEach(({ name, phoneNumber }) => {
            this.adoptionForm.referenceInfo.add(this.referenceInfoRepository.create({
                name,
                phoneNumber,
                fosterApplication: null,
                adoptApplication: this.adoptionForm,
                createdBy: this.adoptionForm.email,
                updatedBy: this.adoptionForm.email,
            }))
        })
    }

    setHouseholdInfo = (householdMemberTypes: HouseholdMemberTypes, info: number[] | HouseholdMemberInfo[]) => {
        if (householdMemberTypes.value === HOUSEHOLD_MEMBER_TYPE.ADULT) {
            (info as HouseholdMemberInfo[]).forEach(({ name, age, occupation }) => {
                this.adoptionForm.householdInfo.add(this.householdInfoRepository.create({
                    name,
                    age,
                    occupation,
                    householdMemberType: householdMemberTypes,
                    fosterApplication: null,
                    adoptApplication: this.adoptionForm,
                    createdBy: this.adoptionForm.email,
                    updatedBy: this.adoptionForm.email,
                }))
            })
        } else {
            (info as number[]).forEach((age) => {
                this.adoptionForm.householdInfo.add(this.householdInfoRepository.create({
                    name: null,
                    age,
                    occupation: null,
                    householdMemberType: householdMemberTypes,
                    fosterApplication: null,
                    adoptApplication: this.adoptionForm,
                    createdBy: this.adoptionForm.email,
                    updatedBy: this.adoptionForm.email,
                }))
            })
        }
    }

    setMapping = (pendingStatus: Status, pets: Pets[]) => {
        pets.forEach((pet) => {
            this.adoptionForm.adoptRequest.add(this.adoptApplicationPetRepository.create({
                status: pendingStatus,
                adoptApplication: this.adoptionForm,
                pet,
                createdBy: this.adoptionForm.email,
                updatedBy: this.adoptionForm.email,
            }));
        })
    }

    getForm = () => this.adoptionForm;
}

export class FosterFormBuilder implements FormBuilder {
    private fosteringForm: FosterApplications;
    private repository: FosterApplicationsRepository;
    private referenceInfoRepository: ReferenceInfoRepository;
    private householdInfoRepository: HouseholdInfoRepository;
    private fosterApplicationPetTypeRepository: FosterApplicationPetCategoryRepository;

    constructor(
        repository: FosterApplicationsRepository,
        referenceInfoRepository: ReferenceInfoRepository,
        householdInfoRepository: HouseholdInfoRepository,
        fosterApplicationPetTypeRepository: FosterApplicationPetCategoryRepository
    ) {
        this.repository = repository;
        this.referenceInfoRepository = referenceInfoRepository;
        this.householdInfoRepository = householdInfoRepository;
        this.fosterApplicationPetTypeRepository = fosterApplicationPetTypeRepository;
    }

    setForm = (essentialInfro: RequiredEntityData<FosterApplications, never, false>) => {
        this.fosteringForm = this.repository.create(essentialInfro);
    }

    setReferenceInfo = (referenceInfo: ReferenceInfo[]) => {
        referenceInfo.forEach(({ name, phoneNumber }) => {
            this.fosteringForm.referenceInfo.add(this.referenceInfoRepository.create({
                name,
                phoneNumber,
                fosterApplication: this.fosteringForm,
                adoptApplication: null,
                createdBy: this.fosteringForm.email,
                updatedBy: this.fosteringForm.email,
            }))
        })
    }

    setHouseholdInfo = (householdMemberTypes: HouseholdMemberTypes, info: number[] | HouseholdMemberInfo[]) => {
        if (householdMemberTypes.value === HOUSEHOLD_MEMBER_TYPE.ADULT) {
            (info as HouseholdMemberInfo[]).forEach(({ name, age, occupation }) => {
                this.fosteringForm.householdInfo.add(this.householdInfoRepository.create({
                    name,
                    age,
                    occupation,
                    householdMemberType: householdMemberTypes,
                    fosterApplication: this.fosteringForm,
                    adoptApplication: null,
                    createdBy: this.fosteringForm.email,
                    updatedBy: this.fosteringForm.email,
                }))
            })
        } else {
            (info as number[]).forEach((age) => {
                this.fosteringForm.householdInfo.add(this.householdInfoRepository.create({
                    name: null,
                    age,
                    occupation: null,
                    householdMemberType: householdMemberTypes,
                    fosterApplication: this.fosteringForm,
                    adoptApplication: null,
                    createdBy: this.fosteringForm.email,
                    updatedBy: this.fosteringForm.email,
                }))
            })
        }
    }

    setMapping = (pendingStatus: Status, petCategories: PetCategories[]) => {
        petCategories.forEach((petCategory) => {
            this.fosteringForm.fosterRequest.add(this.fosterApplicationPetTypeRepository.create({
                status: pendingStatus,
                fosterApplication: this.fosteringForm,
                petCategory,
                createdBy: this.fosteringForm.email,
                updatedBy: this.fosteringForm.email,
            }));
        })
    }

    getForm = () => this.fosteringForm;
}